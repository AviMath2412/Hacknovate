import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { CivicTechPlatform } from './pages/CivicTechPlatform';
import { LicenseRenewalPage } from './pages/licence';
import UtilityBillPage from './pages/UtilityBillPage';
import { BuildingPermitsPage } from 'building';
import { PublicRecordsPage } from './pages/publicservices';
import DriverLicenseRenewalForm from './pages/renewvalprocess';
import PropertyTaxPage from './pages/PropertyTaxPage';
import AIChatbot from './components/AIChatbot';
import GetStartedPage from './pages/GetStartedPage';
import Navigation from './components/Navigation';
import CustomerReviews from './components/CustomerReviews';
import WelcomeSection from './components/WelcomeSection';
import ParkingPermitPage from './pages/ParkingPermitPage';
import '@styles/index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Something went wrong</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">We're sorry, but there was an error loading this page.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navigation darkMode={darkMode} />
      
      <button
        onClick={toggleDarkMode}
        className="fixed top-20 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 z-50"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      <ErrorBoundary>
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<WelcomeSection darkMode={darkMode} />} />
            <Route path="/platform" element={<CivicTechPlatform darkMode={darkMode} />} />
            <Route path="/get-started" element={<GetStartedPage darkMode={darkMode} />} />
            <Route path="/license-renewal" element={<LicenseRenewalPage darkMode={darkMode} />} />
            <Route path="/tax-payment" element={<PropertyTaxPage darkMode={darkMode} />} />
            <Route path="/utility-bills" element={<UtilityBillPage darkMode={darkMode} />} />
            <Route path="/building-permits" element={<BuildingPermitsPage darkMode={darkMode} />} />
            <Route path="/public-records" element={<PublicRecordsPage darkMode={darkMode} />} />
            <Route path="/driver-license-renewal" element={<DriverLicenseRenewalForm />} />
            <Route path="/parking-permits" element={<ParkingPermitPage darkMode={darkMode} />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </main>
        
        <CustomerReviews darkMode={darkMode} />
        <AIChatbot darkMode={darkMode} />
      </ErrorBoundary>
    </div>
  );
}

export default App;