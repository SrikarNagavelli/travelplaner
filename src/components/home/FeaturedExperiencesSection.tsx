import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { featuredExperiences } from '../../data/experiences';

const FeaturedExperiencesSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Unique Experiences
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Discover authentic local experiences that will make your trip unforgettable.
            </p>
          </div>
          <Link to="/experiences" className="mt-4 md:mt-0 text-primary-600 hover:text-primary-700 font-medium flex items-center group">
            <span>View all experiences</span>
            <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredExperiences.slice(0, 3).map((experience, index) => (
            <motion.div 
              key={experience.id}
              className="group rounded-xl overflow-hidden shadow-sm"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={experience.imageUrl} 
                  alt={experience.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all"></div>
                <div className="absolute top-4 left-4 bg-primary-500 text-white text-sm font-medium py-1 px-3 rounded-full">
                  {experience.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2 text-gray-900 group-hover:text-primary-600 transition-colors">
                  {experience.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{experience.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary-600 font-semibold">${experience.price} per person</span>
                  <span className="text-gray-500 text-sm">{experience.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedExperiencesSection;