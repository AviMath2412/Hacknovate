import React, { useState } from 'react';
import { 
  CreditCard, 
  Building2, 
  Receipt, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Loader2
} from 'lucide-react';

const UtilityBillPage = ({ darkMode }) => {
  const [selectedBill, setSelectedBill] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const utilityBills = [
    {
      id: 'electricity',
      name: 'Electricity Bill',
      icon: Building2,
      description: 'Pay your monthly electricity bills',
      color: 'bg-yellow-500'
    },
    {
      id: 'water',
      name: 'Water Bill',
      icon: Building2,
      description: 'Pay your water utility bills',
      color: 'bg-blue-500'
    },
    {
      id: 'gas',
      name: 'Gas Bill',
      icon: Building2,
      description: 'Pay your natural gas bills',
      color: 'bg-red-500'
    },
    {
      id: 'internet',
      name: 'Internet Bill',
      icon: Building2,
      description: 'Pay your internet service bills',
      color: 'bg-purple-500'
    }
  ];

  const handleBillSelect = (billId) => {
    setSelectedBill(billId);
    setPaymentStatus(null);
  };

  const handlePayment = async () => {
    if (!selectedBill) {
      setPaymentStatus('error');
      return;
    }

    setIsLoading(true);
    setPaymentStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setPaymentStatus('success');
      setSelectedBill('');
    } catch (error) {
      setPaymentStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <h1 className="text-4xl font-bold mb-4">Utility Bill Payments</h1>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Pay your utility bills quickly and securely
          </p>
        </div>

        <div className={`rounded-lg shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
          {paymentStatus === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Payment Successful!
              </h2>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Your payment has been processed successfully. A receipt has been sent to your email.
              </p>
              <button
                onClick={() => setPaymentStatus(null)}
                className={`px-6 py-2 rounded-md ${
                  darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
                } text-white transition-colors`}
              >
                Make Another Payment
              </button>
            </div>
          ) : paymentStatus === 'error' ? (
            <div className="text-center py-8">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Payment Failed
              </h2>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Please select a bill type and try again.
              </p>
              <button
                onClick={() => setPaymentStatus(null)}
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
                {utilityBills.map((bill) => (
                  <div
                    key={bill.id}
                    className={`p-6 rounded-lg border cursor-pointer transition-all ${
                      selectedBill === bill.id
                        ? darkMode
                          ? 'border-blue-500 bg-blue-500 bg-opacity-20'
                          : 'border-blue-500 bg-blue-50'
                        : darkMode
                        ? 'border-gray-700 hover:bg-gray-700'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => handleBillSelect(bill.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bill.color} bg-opacity-10`}>
                        <bill.icon className={`h-6 w-6 ${bill.color.replace('bg-', 'text-')}`} />
                      </div>
                      <div>
                        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {bill.name}
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {bill.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button
                  onClick={handlePayment}
                  disabled={!selectedBill || isLoading}
                  className={`w-full py-3 px-4 rounded-md flex items-center justify-center space-x-2 ${
                    !selectedBill || isLoading
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
                      <span>Proceed to Payment</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>

              <div className={`mt-8 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Payment Information
                </h3>
                <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    Secure payment processing
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    Instant payment confirmation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    Email receipt sent immediately
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    24/7 payment processing
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

export default UtilityBillPage; 