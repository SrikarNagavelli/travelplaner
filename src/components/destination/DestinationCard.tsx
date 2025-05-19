import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Destination } from '../../types/destination';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <motion.div 
      className="group rounded-xl overflow-hidden shadow-sm h-full flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/destinations/${destination.id}`} className="block flex-grow">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={destination.imageUrl} 
            alt={destination.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-full p-6 text-white">
            <h3 className="font-display font-bold text-2xl mb-1">{destination.name}</h3>
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              <span className="text-sm">{destination.country}</span>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white flex-grow">
          <div className="flex items-center mb-3 space-x-3">
            {destination.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 rounded-full bg-primary-50 text-primary-700"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-gray-600 mb-4 line-clamp-3">{destination.description}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Best time: {destination.bestTimeToVisit}</span>
            <span className="font-medium text-primary-600">View Details</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default DestinationCard;