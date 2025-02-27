import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Car, Plus, Save, Check, AlertCircle } from 'lucide-react';
import { useVehicle } from '../context/VehicleContext';
import { Vehicle } from '../types';

const QRGenerator: React.FC = () => {
  const { addVehicle, getUserVehicles } = useVehicle();
  const [showForm, setShowForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    registrationNumber: '',
    model: '',
    color: '',
    ownerName: '',
    ownerContact: '',
    ownerAddress: '',
    emergencyContact: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const userVehicles = getUserVehicles();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (!formData.registrationNumber || !formData.model || !formData.ownerName || !formData.ownerContact) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      addVehicle(formData);
      setSuccess('Vehicle added successfully!');
      setShowForm(false);
      setFormData({
        registrationNumber: '',
        model: '',
        color: '',
        ownerName: '',
        ownerContact: '',
        ownerAddress: '',
        emergencyContact: ''
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError('An error occurred while adding the vehicle');
      console.error(err);
    }
  };

  const getQRValue = () => {
    if (!selectedVehicle) return '';
    
    const vehicle = userVehicles.find(v => v.id === selectedVehicle);
    if (!vehicle) return '';
    
    // Create a URL that points to the emergency access page with the vehicle ID
    return `${window.location.origin}/emergency-access/${vehicle.id}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Vehicle QR Generator
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Generate secure QR codes for your vehicles to help in emergencies and other situations.
          </p>
        </div>

        {success && (
          <div className="mt-8 max-w-md mx-auto bg-green-50 border-l-4 border-green-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-8 max-w-md mx-auto bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-1">
          {/* Add Vehicle Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {showForm ? 'Cancel' : (
                <>
                  <Plus className="-ml-1 mr-2 h-5 w-5" />
                  Add New Vehicle
                </>
              )}
            </button>
          </div>

          {/* Add Vehicle Form */}
          {showForm && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Add New Vehicle
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Fill in the details of your vehicle to generate a QR code.
                </p>
              </div>
              <div className="border-t border-gray-200">
                <form onSubmit={handleSubmit} className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">
                        Registration Number *
                      </label>
                      <input
                        type="text"
                        name="registrationNumber"
                        id="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleInputChange}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                        Vehicle Model *
                      </label>
                      <input
                        type="text"
                        name="model"
                        id="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                        Vehicle Color
                      </label>
                      <input
                        type="text"
                        name="color"
                        id="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
                        Owner Name *
                      </label>
                      <input
                        type="text"
                        name="ownerName"
                        id="ownerName"
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="ownerContact" className="block text-sm font-medium text-gray-700">
                        Owner Contact *
                      </label>
                      <input
                        type="text"
                        name="ownerContact"
                        id="ownerContact"
                        value={formData.ownerContact}
                        onChange={handleInputChange}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="ownerAddress" className="block text-sm font-medium text-gray-700">
                        Owner Address
                      </label>
                      <input
                        type="text"
                        name="ownerAddress"
                        id="ownerAddress"
                        value={formData.ownerAddress}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">
                        Emergency Contact
                      </label>
                      <input
                        type="text"
                        name="emergencyContact"
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Save className="-ml-1 mr-2 h-5 w-5" />
                      Save Vehicle
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Vehicle Selection and QR Display */}
          {!showForm && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Generate QR Code
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Select a vehicle to generate its QR code.
                </p>
              </div>
              
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                {userVehicles.length === 0 ? (
                  <div className="text-center py-6">
                    <Car className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No vehicles</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Get started by adding a new vehicle.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">
                        Select Vehicle
                      </label>
                      <select
                        id="vehicle"
                        name="vehicle"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={selectedVehicle || ''}
                        onChange={(e) => setSelectedVehicle(e.target.value)}
                      >
                        <option value="">Select a vehicle</option>
                        {userVehicles.map((vehicle) => (
                          <option key={vehicle.id} value={vehicle.id}>
                            {vehicle.registrationNumber} - {vehicle.model}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {selectedVehicle && (
                      <div className="mt-6">
                        <div className="flex flex-col items-center">
                          <div className="bg-white p-4 rounded-lg shadow-md">
                            <QRCodeSVG
                              value={getQRValue()}
                              size={200}
                              level="H"
                              includeMargin={true}
                            />
                          </div>
                          <p className="mt-4 text-sm text-gray-500">
                            Scan this QR code to access vehicle information in emergency situations.
                          </p>
                          <button
                            onClick={() => {
                              const qrUrl = getQRValue();
                              // Create a temporary link element
                              const link = document.createElement('a');
                              link.href = qrUrl;
                              link.target = '_blank';
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Test QR Link
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;