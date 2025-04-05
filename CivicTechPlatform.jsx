import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Clock, Shield, Star, TrendingUp } from 'lucide-react';

export const CivicTechPlatform = ({ darkMode }) => {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState(null);
  const [showHero, setShowHero] = useState(true);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    // Trigger card animations after component mount
    const timer = setTimeout(() => {
      setAnimateCards(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      id: 1,
      title: 'License Renewal',
      description: 'Renew your driver\'s license or vehicle registration',
      color: 'bg-blue-100',
      icon: '🚗',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 2,
      title: 'Tax Payment',
      description: 'Pay your property taxes and other municipal taxes',
      color: 'bg-green-100',
      icon: '💰',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1211&q=80'
    },
    {
      id: 3,
      title: 'Utility Bills',
      description: 'View and pay your utility bills',
      color: 'bg-yellow-100',
      icon: '⚡',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 4,
      title: 'Building Permits',
      description: 'Apply for building permits and construction approvals',
      color: 'bg-purple-100',
      icon: '🏗️',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 5,
      title: 'Public Records',
      description: 'Access public records and documents',
      color: 'bg-red-100',
      icon: '📄',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 6,
      title: 'Parking Permits',
      description: 'Apply for residential or visitor parking permits',
      color: 'bg-indigo-100',
      icon: '🅿️',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    }
  ];

  const handleServiceClick = (serviceId) => {
    setActiveService(serviceId);
    setTimeout(() => {
      switch(serviceId) {
        case 1:
          navigate('/license-renewal');
          break;
        case 2:
          navigate('/tax-payment');
          break;
        case 3:
          navigate('/utility-bills');
          break;
        case 4:
          navigate('/building-permits');
          break;
        case 5:
          navigate('/public-records');
          break;
        case 6:
          navigate('/parking-permits');
          break;
        default:
          break;
      }
    }, 300);
  };

  const features = [
    { icon: <Clock className="h-6 w-6" />, text: "24/7 Online Access" },
    { icon: <Shield className="h-6 w-6" />, text: "Secure Transactions" },
    { icon: <CheckCircle className="h-6 w-6" />, text: "Instant Confirmation" },
    { icon: <Star className="h-6 w-6" />, text: "User-Friendly Interface" },
    { icon: <TrendingUp className="h-6 w-6" />, text: "Real-Time Updates" }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      {showHero && (
        <div className={`relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-blue-600'} py-16 md:py-24`}>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Welcome to <span className="text-yellow-300">CivicConnect</span>
              </h1>
              <p className="text-xl text-white mb-8">
                Your one-stop platform for all city services. Fast, secure, and convenient.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                      darkMode ? 'bg-gray-700 text-white' : 'bg-white text-blue-600'
                    }`}
                  >
                    {feature.icon}
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setShowHero(false)}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-lg transform transition hover:scale-105"
              >
                Explore Services
              </button>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </div>
      )}

      {/* Services Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Our Services</h2>
          {!showHero && (
            <button 
              onClick={() => setShowHero(true)}
              className={`px-4 py-2 rounded-lg ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-100 hover:bg-blue-200'
              }`}
            >
              Back to Welcome
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`
                ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : service.color + ' hover:shadow-lg'} 
                rounded-lg overflow-hidden shadow-md transition-all duration-300 cursor-pointer
                ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                ${activeService === service.id ? 'ring-4 ring-blue-500 scale-105' : ''}
              `}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                transform: activeService === service.id ? 'scale(1.05)' : 'scale(1)'
              }}
              onClick={() => handleServiceClick(service.id)}
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-3xl mr-3">{service.icon}</span>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  {service.description}
                </p>
                <div className="flex justify-end">
                  <button 
                    className={`flex items-center ${
                      darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                    }`}
                  >
                    Get Started <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Homeowner",
                text: "Renewing my property tax was so easy! The process took less than 5 minutes.",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                name: "Rajesh Patel",
                role: "Business Owner",
                text: "The building permit application process was streamlined and efficient. Highly recommended!",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                name: "Ananya Reddy",
                role: "Resident",
                text: "Getting my residential parking permit was quick and hassle-free. The online system is intuitive!",
                avatar: "https://randomuser.me/api/portraits/women/68.jpg"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className={`${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg p-6 shadow-md`}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.role}</p>
                  </div>
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>"{testimonial.text}"</p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`h-5 w-5 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} fill="currentColor" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};