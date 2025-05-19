import React, { useState } from 'react';
import { MapPin, Clock, Edit2, Trash2, Save, X } from 'lucide-react';

interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  type: 'activity' | 'transport' | 'accommodation';
}

interface ItineraryItemCardProps {
  item: ItineraryItem;
  onUpdate: (updatedItem: ItineraryItem) => void;
  onRemove: () => void;
}

const ItineraryItemCard: React.FC<ItineraryItemCardProps> = ({ item, onUpdate, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState<ItineraryItem>({ ...item });
  
  const handleSave = () => {
    onUpdate(editedItem);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditedItem({ ...item });
    setIsEditing(false);
  };
  
  const typeColors = {
    activity: 'bg-primary-100 text-primary-700',
    transport: 'bg-amber-100 text-amber-700',
    accommodation: 'bg-purple-100 text-purple-700',
  };
  
  const typeLabels = {
    activity: 'Activity',
    transport: 'Transport',
    accommodation: 'Accommodation',
  };
  
  return (
    <div className="bg-gray-50 rounded-lg p-4 relative">
      {isEditing ? (
        <div className="space-y-3">
          <div className="flex space-x-3">
            <div className="w-1/3">
              <label className="block text-xs text-gray-500 mb-1">Time</label>
              <input
                type="time"
                value={editedItem.time}
                onChange={(e) => setEditedItem({ ...editedItem, time: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div className="w-2/3">
              <label className="block text-xs text-gray-500 mb-1">Type</label>
              <select
                value={editedItem.type}
                onChange={(e) => setEditedItem({ ...editedItem, type: e.target.value as ItineraryItem['type'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="activity">Activity</option>
                <option value="transport">Transport</option>
                <option value="accommodation">Accommodation</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-gray-500 mb-1">Title</label>
            <input
              type="text"
              value={editedItem.title}
              onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-xs text-gray-500 mb-1">Location</label>
            <input
              type="text"
              value={editedItem.location}
              onChange={(e) => setEditedItem({ ...editedItem, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-xs text-gray-500 mb-1">Description</label>
            <textarea
              value={editedItem.description}
              onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
              rows={2}
            ></textarea>
          </div>
          
          <div className="flex items-center justify-end space-x-2 mt-4">
            <button
              onClick={handleCancel}
              className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 px-2 py-1"
            >
              <X size={16} />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-1 bg-primary-500 hover:bg-primary-600 text-white px-3 py-1 rounded-md transition-colors"
            >
              <Save size={16} />
              <span>Save</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <div className="flex items-start space-x-3">
              <div className="flex flex-col items-center">
                <div className="bg-gray-200 rounded-lg px-2 py-1 text-xs font-medium text-gray-700 mb-1">
                  {item.time}
                </div>
                <div className="w-0.5 h-full bg-gray-200"></div>
              </div>
              
              <div>
                <div className="flex items-center mb-1">
                  <span className={`text-xs rounded-full px-2 py-0.5 mr-2 ${typeColors[item.type]}`}>
                    {typeLabels[item.type]}
                  </span>
                  <h4 className="font-medium">{item.title}</h4>
                </div>
                
                {item.location && (
                  <div className="flex items-center text-gray-500 text-sm mb-1">
                    <MapPin size={14} className="mr-1" />
                    <span>{item.location}</span>
                  </div>
                )}
                
                {item.description && (
                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex space-x-1">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={onRemove}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ItineraryItemCard;