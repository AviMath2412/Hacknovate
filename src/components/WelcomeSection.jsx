import React from 'react';
import { 
  ArrowRight, 
  Shield, 
  Clock, 
  FileText, 
  Building2, 
  Receipt, 
  Users,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const WelcomeSection = ({ darkMode }) => {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Bank-grade security for all your transactions and data'
    },
    {
      icon: Clock,
      title: '24/7 Access',
      description: 'Access services anytime, anywhere with our online platform'
    },
    {
      icon: FileText,
      title: 'Paperless Process',
      description: 'Complete all your civic tasks without paperwork'
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      description: 'Get help from our expert support team when you need it'
    }
  ];

  const services = [
    {
      icon: Building2,
      title: 'Property Services',
      description: 'Manage property taxes, permits, and records',
      color: 'bg-blue-500'
    },
    {
      icon: FileText,
      title: 'License Renewal',
      description: 'Renew licenses and permits with ease',
      color: 'bg-green-500'
    },
    {
      icon: Receipt,
      title: 'Bill Payments',
      description: 'Pay utility bills and taxes online',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className={`relative ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-white to-blue-50'}`}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 shadow-sm">
            <Sparkles className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Welcome to the Future of Civic Services</span>
          </div>
          
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Welcome to <span className="text-blue-600">CivicConnect</span>
          </h1>
          
          <p className={`text-xl md:text-2xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Your one-stop platform for all civic services. Fast, secure, and convenient.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className={`px-6 py-3 rounded-lg flex items-center justify-center space-x-2 ${
              darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
            } text-white transition-colors shadow-md hover:shadow-lg`}>
              <span>Get Started</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className={`px-6 py-3 rounded-lg flex items-center justify-center space-x-2 ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            } ${darkMode ? 'text-white' : 'text-gray-700'} transition-colors shadow-md hover:shadow-lg`}>
              Learn More
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                darkMode ? 'bg-blue-900' : 'bg-blue-100'
              }`}>
                <feature.icon className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {feature.title}
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Services Section */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Our Services
          </h2>
          <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover the range of services we offer to make your civic experience seamless
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className={`absolute top-0 left-0 w-full h-1 ${service.color}`}></div>
              <div className="p-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${service.color} bg-opacity-10`}>
                  <service.icon className={`h-6 w-6 ${service.color.replace('bg-', 'text-')}`} />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {service.title}
                </h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {service.description}
                </p>
                <div className="flex items-center text-sm">
                  <CheckCircle2 className={`h-4 w-4 mr-2 ${service.color.replace('bg-', 'text-')}`} />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Available 24/7
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-xl ${
          darkMode ? 'bg-gray-800' : 'bg-blue-50'
        } shadow-lg`}>
          <div className="text-center">
            <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-blue-600'}`}>
              50K+
            </div>
            <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Active Users
            </div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-blue-600'}`}>
              99.9%
            </div>
            <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Uptime
            </div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-blue-600'}`}>
              24/7
            </div>
            <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Support
            </div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-blue-600'}`}>
              100%
            </div>
            <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Secure
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection; 