import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { motion } from 'framer-motion';
import { Plus, Calendar, Clock, MapPin, Edit2, Trash2, Save } from 'lucide-react';
import { allDestinations } from '../data/destinations';
import ItineraryDayCard from '../components/itinerary/ItineraryDayCard';
import DestinationSelector from '../components/itinerary/DestinationSelector';

// Define the ItineraryItem interface
interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  type: 'activity' | 'transport' | 'accommodation';
}

// Define the DayPlan interface
interface DayPlan {
  id: string;
  day: number;
  date: string;
  items: ItineraryItem[];
}

const ItineraryPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const destinationId = params.get('destination');
  
  const destination = destinationId 
    ? allDestinations.find(dest => dest.id === destinationId) 
    : null;
  
  const [selectedDestination, setSelectedDestination] = useState(destination ? destination.id : '');
  const [tripName, setTripName] = useState(destination ? `Trip to ${destination.name}` : 'My Trip');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [itinerary, setItinerary] = useState<DayPlan[]>([]);
  const [showDestinationSelector, setShowDestinationSelector] = useState(!destination);
  const [isEditing, setIsEditing] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      setItinerary((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over?.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddDay = () => {
    const newDay: DayPlan = {
      id: `day-${itinerary.length + 1}`,
      day: itinerary.length + 1,
      date: '',
      items: []
    };
    
    setItinerary([...itinerary, newDay]);
  };

  const handleRemoveDay = (dayId: string) => {
    setItinerary(itinerary.filter(day => day.id !== dayId));
  };

  const handleAddItem = (dayId: string) => {
    const dayIndex = itinerary.findIndex(day => day.id === dayId);
    
    if (dayIndex === -1) return;
    
    const newItem: ItineraryItem = {
      id: `item-${Date.now()}`,
      time: '09:00',
      title: 'New Activity',
      description: 'Add description here',
      location: '',
      type: 'activity'
    };
    
    const updatedDay = {
      ...itinerary[dayIndex],
      items: [...itinerary[dayIndex].items, newItem]
    };
    
    const updatedItinerary = [...itinerary];
    updatedItinerary[dayIndex] = updatedDay;
    
    setItinerary(updatedItinerary);
  };

  const handleUpdateItem = (dayId: string, itemId: string, updatedItem: ItineraryItem) => {
    const dayIndex = itinerary.findIndex(day => day.id === dayId);
    
    if (dayIndex === -1) return;
    
    const itemIndex = itinerary[dayIndex].items.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) return;
    
    const updatedDay = {
      ...itinerary[dayIndex],
      items: [
        ...itinerary[dayIndex].items.slice(0, itemIndex),
        updatedItem,
        ...itinerary[dayIndex].items.slice(itemIndex + 1)
      ]
    };
    
    const updatedItinerary = [...itinerary];
    updatedItinerary[dayIndex] = updatedDay;
    
    setItinerary(updatedItinerary);
  };

  const handleRemoveItem = (dayId: string, itemId: string) => {
    const dayIndex = itinerary.findIndex(day => day.id === dayId);
    
    if (dayIndex === -1) return;
    
    const updatedDay = {
      ...itinerary[dayIndex],
      items: itinerary[dayIndex].items.filter(item => item.id !== itemId)
    };
    
    const updatedItinerary = [...itinerary];
    updatedItinerary[dayIndex] = updatedDay;
    
    setItinerary(updatedItinerary);
  };

  const handleDestinationSelect = (destinationId: string) => {
    setSelectedDestination(destinationId);
    const selected = allDestinations.find(d => d.id === destinationId);
    if (selected) {
      setTripName(`Trip to ${selected.name}`);
    }
    setShowDestinationSelector(false);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="font-display text-4xl font-bold text-gray-900 mb-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                    className="bg-gray-100 border-none rounded px-2 py-1 w-full font-display text-4xl font-bold text-gray-900"
                    autoFocus
                  />
                ) : (
                  tripName
                )}
              </h1>
              <div className="flex items-center text-gray-600">
                {selectedDestination && (
                  <>
                    <MapPin size={16} className="mr-1" />
                    <span>
                      {allDestinations.find(d => d.id === selectedDestination)?.name}, 
                      {allDestinations.find(d => d.id === selectedDestination)?.country}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <button 
                  className="flex items-center space-x-1 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
                  onClick={() => setIsEditing(false)}
                >
                  <Save size={16} />
                  <span>Save</span>
                </button>
              ) : (
                <button 
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 size={16} />
                  <span>Edit</span>
                </button>
              )}
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors">
                Save Itinerary
              </button>
            </div>
          </div>

          {showDestinationSelector ? (
            <DestinationSelector onSelect={handleDestinationSelect} />
          ) : (
            <>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center space-x-3">
                  <Calendar size={20} className="text-gray-500" />
                  <div>
                    <label htmlFor="start-date" className="block text-sm text-gray-500">Start Date</label>
                    <input
                      type="date"
                      id="start-date"
                      className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center space-x-3">
                  <Calendar size={20} className="text-gray-500" />
                  <div>
                    <label htmlFor="end-date" className="block text-sm text-gray-500">End Date</label>
                    <input
                      type="date"
                      id="end-date"
                      className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center space-x-3">
                  <Clock size={20} className="text-gray-500" />
                  <div>
                    <span className="block text-sm text-gray-500">Duration</span>
                    <span className="text-gray-900">
                      {itinerary.length} {itinerary.length === 1 ? 'day' : 'days'}
                    </span>
                  </div>
                </div>
              </div>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={itinerary.map(day => day.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-6">
                    {itinerary.map((day) => (
                      <ItineraryDayCard
                        key={day.id}
                        day={day}
                        onAddItem={() => handleAddItem(day.id)}
                        onUpdateItem={(itemId, updatedItem) => handleUpdateItem(day.id, itemId, updatedItem)}
                        onRemoveItem={(itemId) => handleRemoveItem(day.id, itemId)}
                        onRemoveDay={() => handleRemoveDay(day.id)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>

              <button
                className="mt-6 flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg transition-colors w-full justify-center"
                onClick={handleAddDay}
              >
                <Plus size={18} />
                <span>Add Day</span>
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ItineraryPage;