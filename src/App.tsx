import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { VehicleProvider } from './context/VehicleContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import QRGenerator from './pages/QRGenerator';
import EmergencyAccess from './pages/EmergencyAccess';

function App() {
  return (
    <AuthProvider>
      <VehicleProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route 
                  path="/qr-generator" 
                  element={
                    <ProtectedRoute>
                      <QRGenerator />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/emergency-access/:vehicleId" element={<EmergencyAccess />} />
              </Routes>
            </main>
            <footer className="bg-white border-t border-gray-200 py-4">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} Vahan Guard. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </Router>
      </VehicleProvider>
    </AuthProvider>
  );
}

export default App;