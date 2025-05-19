import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Hotel, DollarSign, ChevronRight } from 'lucide-react';
import DestinationCard from '../components/destination/DestinationCard';
import FeaturedExperiencesSection from '../components/home/FeaturedExperiencesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FeatureCard from '../components/home/FeatureCard';
import { featuredDestinations } from '../data/destinations';

const HomePage: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/462024/pexels-photo-462024.jpeg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <motion.h1 
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Your Perfect Journey
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore destinations, build itineraries, and plan your dream vacation
          </motion.p>
          
          <motion.div 
            className="bg-white p-4 md:p-6 rounded-xl shadow-lg w-full max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Where would you like to go?" 
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                />
              </div>
              <button className="w-full md:w-auto bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                <span>Explore Now</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Plan Your Perfect Trip
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From discovering destinations to creating customized itineraries, we provide all the tools you need for your dream vacation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<MapPin className="text-primary-500" size={24} />}
              title="Discover Destinations"
              description="Explore hundreds of destinations categorized by interests, budget, and seasons."
              link="/destinations"
            />
            <FeatureCard 
              icon={<Calendar className="text-primary-500" size={24} />}
              title="Build Itineraries"
              description="Create personalized day-by-day travel plans with our easy-to-use itinerary builder."
              link="/itinerary"
            />
            <FeatureCard 
              icon={<Hotel className="text-primary-500" size={24} />}
              title="Find Accommodations"
              description="Browse and filter accommodations based on your preferences and budget."
              link="/accommodations"
            />
            <FeatureCard 
              icon={<DollarSign className="text-primary-500" size={24} />}
              title="Calculate Budget"
              description="Plan your expenses with our comprehensive travel budget calculator."
              link="/budget-calculator"
            />
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Popular Destinations
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Explore our hand-picked selection of trending destinations around the world.
              </p>
            </div>
            <Link to="/destinations" className="mt-4 md:mt-0 text-primary-600 hover:text-primary-700 font-medium flex items-center group">
              <span>View all destinations</span>
              <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.slice(0, 6).map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <FeaturedExperiencesSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Create your personalized travel itinerary today and make your dream vacation a reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/destinations" className="bg-white text-primary-700 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors">
              Explore Destinations
            </Link>
            <Link to="/itinerary" className="bg-transparent hover:bg-primary-700 border-2 border-white font-medium py-3 px-8 rounded-lg transition-colors">
              Create Itinerary
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;