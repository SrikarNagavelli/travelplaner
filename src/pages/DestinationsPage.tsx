import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import DestinationCard from '../components/destination/DestinationCard';
import { allDestinations } from '../data/destinations';

const DestinationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'Beach', 'Mountain', 'Urban', 'Cultural', 
    'Adventure', 'Relaxation', 'Food', 'Historical'
  ];

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredDestinations = allDestinations.filter(destination => {
    // Search filter
    const searchMatch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       destination.country.toLowerCase().includes(searchTerm.toLowerCase());

    // Category filter
    const categoryMatch = selectedCategories.length === 0 || 
                         destination.tags.some(tag => selectedCategories.includes(tag));

    return searchMatch && categoryMatch;
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
            Explore Destinations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Discover amazing places around the world and find your next adventure.
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
                  placeholder="Search destinations..." 
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

                <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <button
                          key={category}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedCategories.includes(category)
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          onClick={() => toggleCategory(category)}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedCategories.length > 0 && (
                    <div className="mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {selectedCategories.length} filters applied
                        </span>
                        <button
                          className="text-primary-600 text-sm hover:underline"
                          onClick={() => setSelectedCategories([])}
                        >
                          Clear all
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="lg:w-3/4">
            {filteredDestinations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredDestinations.map(destination => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <h3 className="font-semibold text-xl mb-2">No destinations found</h3>
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

export default DestinationsPage;