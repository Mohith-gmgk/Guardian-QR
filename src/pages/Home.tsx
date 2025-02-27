import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, QrCode, AlertTriangle, CreditCard, Car } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block">Secure Your Vehicle with</span>
              <span className="block text-indigo-300">Vahan Guard</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl">
              Generate secure QR codes for your vehicles to help in emergencies, parking issues, and payments.
            </p>
            <div className="mt-10">
              {isAuthenticated ? (
                <Link
                  to="/qr-generator"
                  className="inline-block bg-white text-indigo-700 px-8 py-3 rounded-md font-medium shadow-md hover:bg-indigo-50"
                >
                  Generate QR Code
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="inline-block bg-white text-indigo-700 px-8 py-3 rounded-md font-medium shadow-md hover:bg-indigo-50"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              How Vahan Guard Helps You
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Our QR system provides security and convenience in various vehicle-related situations.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="flex justify-center">
                  <AlertTriangle className="h-12 w-12 text-red-500" />
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900 text-center">Accident Assistance</h3>
                <p className="mt-2 text-gray-600">
                  In case of accidents, emergency responders can scan your QR code to access your details after verification.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="flex justify-center">
                  <Car className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900 text-center">Parking Issues</h3>
                <p className="mt-2 text-gray-600">
                  Resolve parking disputes quickly by allowing authorities to contact you through your secure QR code.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="flex justify-center">
                  <CreditCard className="h-12 w-12 text-green-500" />
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900 text-center">Petrol Pump Payments</h3>
                <p className="mt-2 text-gray-600">
                  Make contactless payments at petrol pumps by linking your payment details to your vehicle's QR code.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="flex justify-center">
                  <Shield className="h-12 w-12 text-indigo-500" />
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900 text-center">Enhanced Security</h3>
                <p className="mt-2 text-gray-600">
                  Your information is only revealed after verification through situation-specific image uploads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              How It Works
            </h2>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    1
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900 text-center">Register Your Vehicle</h3>
                <p className="mt-2 text-gray-600">
                  Sign up and add your vehicle details to generate a unique QR code for your vehicle.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    2
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900 text-center">Display Your QR Code</h3>
                <p className="mt-2 text-gray-600">
                  Print and place the QR code on your vehicle for easy scanning in emergency situations.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    3
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900 text-center">Secure Information Access</h3>
                <p className="mt-2 text-gray-600">
                  When scanned, the person must upload a situation-specific image before accessing your details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to secure your vehicle?</span>
            <span className="block text-indigo-300">Start using Vahan Guard today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            {isAuthenticated ? (
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/qr-generator"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  Generate QR Code
                </Link>
              </div>
            ) : (
              <>
                <div className="inline-flex rounded-md shadow">
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                  >
                    Sign Up
                  </Link>
                </div>
                <div className="ml-3 inline-flex rounded-md shadow">
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500"
                  >
                    Login
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;