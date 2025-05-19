import React from 'react';
import { Link } from 'react-router-dom';
import { Home, MapPin } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <MapPin className="h-16 w-16 text-primary-500 mx-auto" />
        </div>
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-3">
          Lost in Adventure?
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          The destination you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors"
        >
          <Home size={20} />
          <span>Back to Homepage</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;