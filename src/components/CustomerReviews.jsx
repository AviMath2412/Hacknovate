import React from 'react';
import { Star, Quote } from 'lucide-react';

const CustomerReviews = ({ darkMode }) => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Property Owner',
      rating: 5,
      comment: 'The property tax payment process was incredibly smooth. I received my receipt instantly and the interface was very user-friendly.',
      date: '2 days ago'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Business Owner',
      rating: 4,
      comment: 'Renewing my business license was a breeze. The step-by-step guidance made it simple to complete the process.',
      date: '1 week ago'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Homeowner',
      rating: 5,
      comment: 'I was able to get my building permit approved much faster than expected. The online submission process saved me a lot of time.',
      date: '2 weeks ago'
    }
  ];

  return (
    <div className={`py-12 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            What Our Customers Say
          </h2>
          <p className={`mt-4 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Real experiences from our valued customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`p-6 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-white'
              } shadow-md hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="flex items-center mb-4">
                <div className="flex-1">
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {review.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {review.role}
                  </p>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < review.rating
                          ? darkMode
                            ? 'text-yellow-400'
                            : 'text-yellow-500'
                          : darkMode
                          ? 'text-gray-600'
                          : 'text-gray-300'
                      }`}
                      fill={i < review.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
              </div>

              <div className="relative">
                <Quote
                  className={`absolute -top-2 -left-2 h-6 w-6 ${
                    darkMode ? 'text-gray-600' : 'text-gray-300'
                  }`}
                />
                <p className={`pl-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {review.comment}
                </p>
              </div>

              <div className={`mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {review.date}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            className={`px-6 py-3 rounded-md ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } transition-colors duration-200`}
          >
            View All Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews; 