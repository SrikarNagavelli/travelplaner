import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { allDestinations } from '../../data/destinations';

interface DestinationSelectorProps {
  onSelect: (destinationId: string) => void;
}

const DestinationSelector: React.FC<DestinationSelectorProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDestinations = allDestinations.filter(destination => 
    destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination.country.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="font-semibold text-xl mb-4">Select a Destination</h2>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search destinations..." 
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDestinations.map((destination) => (
          <motion.div 
            key={destination.id}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelect(destination.id)}
          >
            <div className="relative h-32 rounded-lg overflow-hidden mb-3">
              <img 
                src={destination.imageUrl} 
                alt={destination.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold">{destination.name}</h3>
            <p className="text-gray-500 text-sm">{destination.country}</p>
          </motion.div>
        ))}
        
        {filteredDestinations.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No destinations found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationSelector;