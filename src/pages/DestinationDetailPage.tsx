import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, MapPin, DollarSign, ThermometerSun, Clock, Bookmark,
  Phone, Globe, Star, Info, PlusCircle, ChevronRight, MapIcon
} from 'lucide-react';
import { allDestinations } from '../data/destinations';
import { accommodations } from '../data/accommodations';
import { featuredExperiences } from '../data/experiences';
import NotFoundPage from './NotFoundPage';

const DestinationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find the destination
  const destination = allDestinations.find(dest => dest.id === id);
  
  // Filter accommodations and experiences for this destination
  const destinationAccommodations = accommodations.filter(acc => acc.destinationId === id);
  const destinationExperiences = featuredExperiences.filter(exp => exp.destinationId === id);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  if (!destination) {
    return <NotFoundPage />;
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'attractions', label: 'Attractions' },
    { id: 'accommodations', label: 'Accommodations' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'practical-info', label: 'Practical Info' },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <div className="absolute inset-0">
          <img 
            src={destination.imageUrl} 
            alt={destination.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
          <div className="text-white">
            <div className="flex items-center mb-4">
              <Link to="/destinations" className="text-white/80 hover:text-white transition-colors">
                Destinations
              </Link>
              <ChevronRight size={16} className="mx-2 text-white/60" />
              <span>{destination.name}</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {destination.name}
            </h1>
            <div className="flex items-center space-x-6 text-white/90">
              <div className="flex items-center">
                <MapPin size={18} className="mr-2" />
                <span>{destination.country}</span>
              </div>
              <div className="flex items-center">
                <ThermometerSun size={18} className="mr-2" />
                <span>Best time: {destination.bestTimeToVisit}</span>
              </div>
              <div className="flex items-center">
                <DollarSign size={18} className="mr-2" />
                <span>Budget: {destination.budget}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-16 bg-white shadow-sm z-20">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`py-4 px-6 font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id 
                    ? 'border-primary-500 text-primary-700' 
                    : 'border-transparent text-gray-600 hover:text-primary-600'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="lg:w-2/3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <h2 className="font-display text-2xl font-bold mb-4">About {destination.name}</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 mb-4">{destination.description}</p>
                    <p className="text-gray-700 mb-4">
                      {destination.country} is known for its {destination.tags.join(', ')} experiences.
                      Whether you're looking for adventure, relaxation, or cultural immersion, 
                      {destination.name} offers something for every type of traveler.
                    </p>
                    <p className="text-gray-700">
                      The best time to visit is during {destination.bestTimeToVisit} when the weather
                      is ideal for exploring the region's natural beauty and cultural attractions.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <h2 className="font-display text-2xl font-bold mb-4">Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                        <span className="bg-primary-100 text-primary-700 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{highlight.title}</h3>
                          <p className="text-gray-600 text-sm">{highlight.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                  <div className="h-96 relative">
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="text-center">
                        <MapIcon size={48} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500">Interactive map would be displayed here</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h2 className="font-display text-2xl font-bold">Popular Experiences</h2>
                    <Link to={`/experiences?destination=${id}`} className="text-primary-600 hover:text-primary-700 font-medium flex items-center mt-2 md:mt-0">
                      <span>View all experiences</span>
                      <ChevronRight size={18} className="ml-1" />
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {destinationExperiences.slice(0, 4).map((experience) => (
                      <div key={experience.id} className="flex bg-gray-50 rounded-lg overflow-hidden">
                        <div className="w-1/3 flex-shrink-0">
                          <img 
                            src={experience.imageUrl} 
                            alt={experience.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-4">
                          <h3 className="font-semibold text-gray-900 mb-1">{experience.title}</h3>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{experience.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-primary-600 font-medium">${experience.price}</span>
                            <span className="text-xs text-gray-500">{experience.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Other tabs would be implemented similarly */}
            {activeTab !== 'overview' && (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <h3 className="font-semibold text-xl mb-2">{tabs.find(tab => tab.id === activeTab)?.label} Content</h3>
                <p className="text-gray-600">
                  This section is under development. Check back soon for more information.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 sticky top-36">
              <h3 className="font-semibold text-xl mb-4">Plan Your Trip</h3>
              
              <Link 
                to={`/itinerary?destination=${id}`}
                className="flex items-center justify-center w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-lg mb-4 transition-colors"
              >
                <PlusCircle size={18} className="mr-2" />
                Add to Itinerary
              </Link>
              
              <button className="flex items-center justify-center w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg mb-6 transition-colors">
                <Bookmark size={18} className="mr-2" />
                Save for Later
              </button>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Clock className="text-gray-500 w-5 h-5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Recommended Stay</p>
                    <p className="font-medium">{destination.recommendedStay}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <DollarSign className="text-gray-500 w-5 h-5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Daily Budget</p>
                    <p className="font-medium">{destination.budget}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="text-gray-500 w-5 h-5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Best Time to Visit</p>
                    <p className="font-medium">{destination.bestTimeToVisit}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold mb-3">Local Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Globe className="text-gray-500 w-4 h-4 mr-2" />
                    <a href="#" className="text-primary-600 hover:underline">Official Tourism Website</a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="text-gray-500 w-4 h-4 mr-2" />
                    <p>Emergency: {destination.emergencyNumber || '911'}</p>
                  </div>
                  <div className="flex items-center">
                    <Info className="text-gray-500 w-4 h-4 mr-2" />
                    <a href="#" className="text-primary-600 hover:underline">Travel Advisories</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailPage;