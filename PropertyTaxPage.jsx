import React, { useState } from 'react';
import { Home, DollarSign, Calendar, CreditCard } from 'lucide-react';

const PropertyTaxPage = ({ darkMode }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock property data
  const properties = [
    { id: 1, address: '123 Main St', taxAmount: 2500, dueDate: '2024-06-30' },
    { id: 2, address: '456 Oak Ave', taxAmount: 1800, dueDate: '2024-06-30' },
  ];

  const validatePaymentAmount = (amount) => {
    if (!amount) {
      setError('Please enter a payment amount');
      return false;
    }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount greater than 0');
      return false;
    }
    if (numAmount > selectedProperty.taxAmount) {
      setError('Payment amount cannot exceed the tax amount');
      return false;
    }
    setError(null);
    return true;
  };

  const handlePayment = async () => {
    if (!selectedProperty) {
      setError('Please select a property first');
      return;
    }

    if (!validatePaymentAmount(paymentAmount)) {
      return;
    }
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Payment successful!');
      setPaymentAmount('');
      setError(null);
    } catch (error) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setPaymentAmount(value);
    if (value) {
      validatePaymentAmount(value);
    } else {
      setError(null);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-6`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Property Tax Payment</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <h2 className="text-xl font-semibold mb-4">Your Properties</h2>
            <div className="space-y-4">
              {properties.map(property => (
                <div
                  key={property.id}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedProperty?.id === property.id
                      ? darkMode ? 'bg-blue-900' : 'bg-blue-100'
                      : darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedProperty(property);
                    setPaymentAmount('');
                    setError(null);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <Home className="h-5 w-5" />
                    <span className="font-medium">{property.address}</span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      ${property.taxAmount.toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Due: {new Date(property.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <h2 className="text-xl font-semibold mb-4">Make Payment</h2>
            {selectedProperty ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Property Address</label>
                  <div className={`p-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded`}>{selectedProperty.address}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Amount Due</label>
                  <div className={`p-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded`}>${selectedProperty.taxAmount.toLocaleString()}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Payment Amount</label>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={handleAmountChange}
                    className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      error ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter amount"
                    min="0"
                    max={selectedProperty.taxAmount}
                    step="0.01"
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                  )}
                </div>
                <button
                  onClick={handlePayment}
                  disabled={!paymentAmount || isLoading || !!error}
                  className={`w-full py-2 px-4 rounded-md flex items-center justify-center space-x-2 ${
                    isLoading || !!error
                      ? 'bg-gray-400'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white transition-colors`}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      <span>Pay Now</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Please select a property to make a payment</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyTaxPage; 