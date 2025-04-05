import React, { useState, useRef } from 'react';

export const LicenseRenewalPage = ({ darkMode }) => {
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [showDocument, setShowDocument] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    expirationDate: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    acceptTerms: false
  });
  
  const documentRef = useRef();
  
  const handleLicenseSelect = (licenseType) => {
    setSelectedLicense(licenseType);
    setShowDocument(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate document with form data
    setShowDocument(true);
  };

  const handleBack = () => {
    if (showDocument) {
      setShowDocument(false);
    } else if (selectedLicense) {
      setSelectedLicense(null);
    }
  };

  // Print document using browser's native print functionality
  const printDocument = () => {
    const printContent = document.getElementById('printable-document');
    const originalContents = document.body.innerHTML;
    
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    
    // Re-render the component after printing
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  // Generate a unique application ID
  const generateApplicationId = () => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    return `${selectedLicense.toUpperCase()}-${timestamp}-${random}`;
  };

  // License options with descriptions
  const licenseTypes = [
    {
      id: 'drivers',
      title: "Driver's License",
      description: "Renew or replace your driver's license"
    },
    {
      id: 'business',
      title: "Business License",
      description: "Renew your business operating permit"
    },
    {
      id: 'professional',
      title: "Professional License",
      description: "Renew professional certifications"
    },
    {
      id: 'special',
      title: "Special Permits",
      description: "Event permits, parking permits, etc."
    }
  ];

  // Generated Document Component
  const RenewalDocument = () => {
    const applicationId = generateApplicationId();
    const selectedLicenseInfo = licenseTypes.find(lt => lt.id === selectedLicense);
    
    return (
      <div id="printable-document" ref={documentRef} className="bg-white p-8 max-w-4xl mx-auto border border-gray-300 shadow-lg">
        <div className="mb-8 text-center border-b-2 border-gray-300 pb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">LICENSE RENEWAL APPLICATION</h1>
          <h2 className="text-xl font-semibold">{selectedLicenseInfo.title}</h2>
          <p className="text-gray-600 mt-2">Application Date: {getCurrentDate()}</p>
          <p className="text-gray-600">Application ID: {applicationId}</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-3">Applicant Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Full Name:</p>
              <p className="font-medium">{formData.fullName}</p>
            </div>
            <div>
              <p className="text-gray-600">Email Address:</p>
              <p className="font-medium">{formData.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Phone Number:</p>
              <p className="font-medium">{formData.phone}</p>
            </div>
            <div>
              <p className="text-gray-600">License Number:</p>
              <p className="font-medium">{formData.licenseNumber}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-3">License Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">License Type:</p>
              <p className="font-medium">{selectedLicenseInfo.title}</p>
            </div>
            <div>
              <p className="text-gray-600">Current Expiration Date:</p>
              <p className="font-medium">{formatDate(formData.expirationDate)}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-3">Address Information</h3>
          <div className="grid grid-cols-1 gap-2">
            <div>
              <p className="text-gray-600">Street Address:</p>
              <p className="font-medium">{formData.address}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-gray-600">City:</p>
                <p className="font-medium">{formData.city}</p>
              </div>
              <div>
                <p className="text-gray-600">State:</p>
                <p className="font-medium">{formData.state}</p>
              </div>
              <div>
                <p className="text-gray-600">Zip Code:</p>
                <p className="font-medium">{formData.zipCode}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-3">Terms and Conditions</h3>
          <p className="text-gray-700">The applicant confirms that all information provided in this application is true and accurate to the best of their knowledge. Any falsification of information may result in denial of the application or revocation of the license.</p>
          <div className="mt-4">
            <p className="text-gray-600">Accepted Terms: {formData.acceptTerms ? "Yes" : "No"}</p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-300">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-600">Applicant Signature:</p>
              <div className="mt-2 border-b border-gray-400 w-48"></div>
              <p className="text-gray-600 mt-1">{formData.fullName}</p>
            </div>
            <div>
              <p className="text-gray-600">Date:</p>
              <div className="mt-2 border-b border-gray-400 w-48"></div>
              <p className="text-gray-600 mt-1">{getCurrentDate()}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>This is an official application document. Please retain a copy for your records.</p>
          <p>For official use only - Application ID: {applicationId}</p>
        </div>
      </div>
    );
  };

  // Form for the selected license type
  const renderForm = () => {
    const selectedLicenseInfo = licenseTypes.find(lt => lt.id === selectedLicense);
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBack}
            className="text-blue-600 hover:text-blue-800 mr-4"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold">Renew {selectedLicenseInfo.title}</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="fullName">Full Name</label>
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="licenseNumber">License Number</label>
                <input 
                  type="text" 
                  id="licenseNumber" 
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">License Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="expirationDate">Expiration Date</label>
                <input 
                  type="date" 
                  id="expirationDate" 
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1" htmlFor="address">Address</label>
                <input 
                  type="text" 
                  id="address" 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="city">City</label>
                <input 
                  type="text" 
                  id="city" 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="state">State</label>
                <input 
                  type="text" 
                  id="state" 
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="zipCode">Zip Code</label>
                <input 
                  type="text" 
                  id="zipCode" 
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-start">
              <input 
                type="checkbox" 
                id="acceptTerms" 
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className="mt-1"
                required
              />
              <label className="ml-2 text-gray-700" htmlFor="acceptTerms">
                I confirm that all information provided is accurate and I agree to the terms and conditions.
              </label>
            </div>
          </div>

          <div className="mt-6">
            <button 
              type="submit" 
              className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
            >
              Submit Renewal Application
            </button>
          </div>
        </form>
      </div>
    );
  };

  // Document view with save options
  const renderDocument = () => {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <button 
                onClick={handleBack}
                className="text-blue-600 hover:text-blue-800 mr-4"
              >
                ← Back to Form
              </button>
              <h2 className="text-2xl font-bold">Application Document</h2>
            </div>
            <button 
              onClick={printDocument}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
              </svg>
              Print / Save PDF
            </button>
          </div>
          <p className="text-gray-600 mb-4">Review your application document. You can print it or save as PDF using your browser's print functionality.</p>
        </div>
        
        <RenewalDocument />
      </div>
    );
  };

  // License selection screen
  const renderLicenseSelection = () => {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-blue-50 p-8 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="bg-blue-200 p-2 rounded mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">License Renewal</h1>
          </div>
          <p className="text-gray-600 mb-6">Renew your driver's license, business permits, and professional credentials</p>
          
          <h2 className="text-xl font-semibold mb-4">License Types</h2>
          <div className="space-y-4">
            {licenseTypes.map(license => (
              <div 
                key={license.id}
                className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
                onClick={() => handleLicenseSelect(license.id)}
              >
                <h3 className="text-lg font-semibold text-blue-600">{license.title}</h3>
                <p className="text-gray-600">{license.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {showDocument ? renderDocument() : (selectedLicense ? renderForm() : renderLicenseSelection())}
    </div>
  );
};