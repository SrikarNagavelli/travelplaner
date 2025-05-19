import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, Star, MapPin } from 'lucide-react';
import { accommodations } from '../data/accommodations';
import { allDestinations } from '../data/destinations';

const AccommodationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const accommodationTypes = ['Hotel', 'Hostel', 'Apartment', 'Resort', 'Villa', 'Guesthouse'];

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const filteredAccommodations = accommodations.filter(accommodation => {
    // Search filter
    const searchMatch = accommodation.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       accommodation.location.toLowerCase().includes(searchTerm.toLowerCase());

    // Destination filter
    const destinationMatch = selectedDestination === '' || accommodation.destinationId === selectedDestination;

    // Price filter
    const priceMatch = accommodation.pricePerNight >= priceRange[0] && accommodation.pricePerNight <= priceRange[1];

    // Type filter
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(accommodation.type);

    return searchMatch && destinationMatch && priceMatch && typeMatch;
  });

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Discover accommodations that match your preferences and budget.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Search and Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search accommodations..." 
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="lg:block">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <button 
                    className="lg:hidden flex items-center text-primary-600"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter size={16} className="mr-1" />
                    <span>{showFilters ? 'Hide filters' : 'Show filters'}</span>
                  </button>
                </div>

                <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-6`}>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Destination</h4>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                      value={selectedDestination}
                      onChange={(e) => setSelectedDestination(e.target.value)}
                    >
                      <option value="">All Destinations</option>
                      {allDestinations.map(destination => (
                        <option key={destination.id} value={destination.id}>
                          {destination.name}, {destination.country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}+</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        step="50"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Accommodation Type</h4>
                    <div className="space-y-2">
                      {accommodationTypes.map(type => (
                        <div key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            id={type}
                            checked={selectedTypes.includes(type)}
                            onChange={() => toggleType(type)}
                            className="h-4 w-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                          />
                          <label htmlFor={type} className="ml-2 text-gray-700">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {(selectedDestination !== '' || priceRange[0] > 0 || priceRange[1] < 1000 || selectedTypes.length > 0) && (
                    <div>
                      <button
                        className="text-primary-600 text-sm hover:underline"
                        onClick={() => {
                          setSelectedDestination('');
                          setPriceRange([0, 1000]);
                          setSelectedTypes([]);
                        }}
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Accommodations Grid */}
          <div className="lg:w-3/4">
            {filteredAccommodations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAccommodations.map(accommodation => (
                  <motion.div
                    key={accommodation.id}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col"
                  >
                    <div className="relative h-64">
                      <img 
                        src={accommodation.imageUrl} 
                        alt={accommodation.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-white bg-opacity-90 rounded-full px-2 py-1 text-xs font-medium">
                        {accommodation.type}
                      </div>
                    </div>
                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-xl">{accommodation.name}</h3>
                        <span className="text-primary-600 font-bold">${accommodation.pricePerNight} <span className="text-gray-500 font-normal text-sm">/ night</span></span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <MapPin size={14} className="mr-1" />
                        <span>{accommodation.location}</span>
                      </div>
                      <div className="flex items-center mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            fill={i < accommodation.rating ? "currentColor" : "none"} 
                            className={i < accommodation.rating ? "text-yellow-400" : "text-gray-300"} 
                          />
                        ))}
                        <span className="text-gray-500 text-sm ml-1">({accommodation.reviewCount} reviews)</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{accommodation.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {accommodation.amenities.slice(0, 3).map((amenity, index) => (
                          <span 
                            key={index}
                            className="bg-gray-100 text-gray-700 rounded-full px-2 py-1 text-xs"
                          >
                            {amenity}
                          </span>
                        ))}
                        {accommodation.amenities.length > 3 && (
                          <span className="bg-gray-100 text-gray-700 rounded-full px-2 py-1 text-xs">
                            +{accommodation.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                      <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 rounded-lg transition-colors">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <h3 className="font-semibold text-xl mb-2">No accommodations found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationsPage;