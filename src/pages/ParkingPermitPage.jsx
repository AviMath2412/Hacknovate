import React, { useState } from 'react';
import { 
  Car, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Loader2,
  MapPin,
  Calendar,
  CreditCard
} from 'lucide-react';

const ParkingPermitPage = ({ darkMode }) => {
  const [selectedPermit, setSelectedPermit] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);

  const permitTypes = [
    {
      id: 'residential',
      name: 'Residential Permit',
      icon: Car,
      description: 'For residents who need regular parking in their neighborhood',
      color: 'bg-blue-500'
    },
    {
      id: 'visitor',
      name: 'Visitor Permit',
      icon: Car,
      description: 'For visitors who need temporary parking in residential areas',
      color: 'bg-green-500'
    },
    {
      id: 'business',
      name: 'Business Permit',
      icon: Car,
      description: 'For business owners and employees in commercial areas',
      color: 'bg-purple-500'
    },
    {
      id: 'special',
      name: 'Special Event Permit',
      icon: Car,
      description: 'For special events and temporary parking needs',
      color: 'bg-yellow-500'
    }
  ];

  const handlePermitSelect = (permitId) => {
    setSelectedPermit(permitId);
    setApplicationStatus(null);
  };

  const handleApplication = async () => {
    if (!selectedPermit) {
      setApplicationStatus('error');
      return;
    }

    setIsLoading(true);
    setApplicationStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setApplicationStatus('success');
      setSelectedPermit('');
    } catch (error) {
      setApplicationStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <h1 className="text-4xl font-bold mb-4">Parking Permits</h1>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Apply for and manage your parking permits
          </p>
        </div>

        <div className={`rounded-lg shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
          {applicationStatus === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Application Submitted!
              </h2>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Your parking permit application has been submitted successfully. We'll process it within 2-3 business days.
              </p>
              <button
                onClick={() => setApplicationStatus(null)}
                className={`px-6 py-2 rounded-md ${
                  darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
                } text-white transition-colors`}
              >
                Apply for Another Permit
              </button>
            </div>
          ) : applicationStatus === 'error' ? (
            <div className="text-center py-8">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Application Failed
              </h2>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Please select a permit type and try again.
              </p>
              <button
                onClick={() => setApplicationStatus(null)}
                className={`px-6 py-2 rounded-md ${
                  darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
                } text-white transition-colors`}
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {permitTypes.map((permit) => (
                  <div
                    key={permit.id}
                    className={`p-6 rounded-lg border cursor-pointer transition-all ${
                      selectedPermit === permit.id
                        ? darkMode
                          ? 'border-blue-500 bg-blue-500 bg-opacity-20'
                          : 'border-blue-500 bg-blue-50'
                        : darkMode
                        ? 'border-gray-700 hover:bg-gray-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => handlePermitSelect(permit.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${permit.color} bg-opacity-10`}>
                        <permit.icon className={`h-6 w-6 ${permit.color.replace('bg-', 'text-')}`} />
                      </div>
                      <div>
                        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {permit.name}
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {permit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button
                  onClick={handleApplication}
                  disabled={!selectedPermit || isLoading}
                  className={`w-full py-3 px-4 rounded-md flex items-center justify-center space-x-2 ${
                    !selectedPermit || isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : darkMode
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white transition-colors`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Apply for Permit</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>

              <div className={`mt-8 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Permit Information
                </h3>
                <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-center">
                    <MapPin className="h-4 w-4 text-blue-500 mr-2" />
                    Valid in designated zones only
                  </li>
                  <li className="flex items-center">
                    <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                    Duration varies by permit type
                  </li>
                  <li className="flex items-center">
                    <CreditCard className="h-4 w-4 text-blue-500 mr-2" />
                    Payment required upon approval
                  </li>
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 text-blue-500 mr-2" />
                    Processing time: 2-3 business days
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParkingPermitPage; 