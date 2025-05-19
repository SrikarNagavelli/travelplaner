import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import ItineraryItemCard from './ItineraryItemCard';

interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  type: 'activity' | 'transport' | 'accommodation';
}

interface DayPlan {
  id: string;
  day: number;
  date: string;
  items: ItineraryItem[];
}

interface ItineraryDayCardProps {
  day: DayPlan;
  onAddItem: () => void;
  onUpdateItem: (itemId: string, updatedItem: ItineraryItem) => void;
  onRemoveItem: (itemId: string) => void;
  onRemoveDay: () => void;
}

const ItineraryDayCard: React.FC<ItineraryDayCardProps> = ({ 
  day, 
  onAddItem, 
  onUpdateItem, 
  onRemoveItem,
  onRemoveDay 
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: day.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className="bg-white rounded-xl shadow-sm"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div 
            {...attributes} 
            {...listeners}
            className="flex items-center justify-center w-8 h-8 rounded-full cursor-grabbing mr-3 hover:bg-gray-100"
          >
            <GripVertical size={18} className="text-gray-400" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Day {day.day}</h3>
            <p className="text-gray-500 text-sm">{day.date || 'Date not set'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            {isExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <button
            onClick={onRemoveDay}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4">
          {day.items.length > 0 ? (
            <div className="space-y-3">
              {day.items.map((item) => (
                <ItineraryItemCard
                  key={item.id}
                  item={item}
                  onUpdate={(updatedItem) => onUpdateItem(item.id, updatedItem)}
                  onRemove={() => onRemoveItem(item.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No activities planned for this day</p>
            </div>
          )}
          
          <button
            onClick={onAddItem}
            className="mt-4 flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-lg transition-colors w-full justify-center text-sm"
          >
            <Plus size={16} />
            <span>Add Activity</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ItineraryDayCard;