import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Upload, AlertTriangle, Check, X } from 'lucide-react';
import { useVehicle } from '../context/VehicleContext';
import { Vehicle, EmergencyRequest } from '../types';

const EmergencyAccess: React.FC = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const { getVehicleById, createEmergencyRequest, getEmergencyRequestById } = useVehicle();
  
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestType, setRequestType] = useState<'accident' | 'parking' | 'payment' | 'other'>('accident');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [requestStatus, setRequestStatus] = useState<'pending' | 'approved' | 'rejected' | null>(null);

  useEffect(() => {
    if (vehicleId) {
      const foundVehicle = getVehicleById(vehicleId);
      if (foundVehicle) {
        setVehicle(foundVehicle);
      } else {
        setError('Vehicle not found');
      }
      setLoading(false);
    }
  }, [vehicleId, getVehicleById]);

  // Simulate checking request status periodically
  useEffect(() => {
    if (!requestId) return;

    const checkStatus = () => {
      const request = getEmergencyRequestById(requestId);
      if (request) {
        setRequestStatus(request.status);
        
        // For demo purposes, automatically approve after 5 seconds
        if (request.status === 'pending') {
          setTimeout(() => {
            // This would normally be done by the vehicle owner
            // but for demo purposes we're auto-approving
            const updatedRequest = getEmergencyRequestById(requestId);
            if (updatedRequest && updatedRequest.status === 'pending') {
              // Simulate approval
              setRequestStatus('approved');
            }
          }, 5000);
        }
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 2000);
    
    return () => clearInterval(interval);
  }, [requestId, getEmergencyRequestById]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!vehicleId || !imageFile) {
      setError('Please upload an image of the current situation');
      return;
    }
    
    try {
      // In a real app, we would upload the image to a server
      // For this demo, we'll use the image preview URL
      const imageUrl = imagePreview || '';
      
      const newRequestId = createEmergencyRequest({
        vehicleId,
        requestType,
        imageUrl,
        description
      });
      
      setRequestId(newRequestId);
      setRequestStatus('pending');
    } catch (err) {
      setError('Failed to submit request');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Shield className="h-12 w-12 text-indigo-600 mx-auto" />
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
            Emergency Vehicle Access
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Please verify your situation to access vehicle owner information.
          </p>
        </div>

        {requestStatus === null ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Verification Required
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Upload an image of the current situation to request access to vehicle owner details.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <form onSubmit={handleSubmit} className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Situation Type
                  </label>
                  <select
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value as any)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="accident">Accident</option>
                    <option value="parking">Parking Issue</option>
                    <option value="payment">Payment</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Please describe the situation..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Situation Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {imagePreview ? (
                        <div>
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="mx-auto h-32 w-auto object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview(null);
                            }}
                            className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleImageChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!imageFile}
                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                      imageFile ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : requestStatus === 'pending' ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 text-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="rounded-full bg-indigo-100 p-3">
                  <Shield className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="mt-4 text-lg leading-6 font-medium text-gray-900">
                  Verifying Your Request
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Please wait while the vehicle owner reviews your request.
                </p>
                <div className="mt-4 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500 mr-2"></div>
                  <span className="text-sm text-gray-500">Processing...</span>
                </div>
              </div>
            </div>
          </div>
        ) : requestStatus === 'approved' ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex items-center">
              <Check className="h-6 w-6 text-green-500 mr-2" />
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Request Approved
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Vehicle Registration</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {vehicle?.registrationNumber}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Vehicle Model</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {vehicle?.model}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Vehicle Color</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {vehicle?.color}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Owner Name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {vehicle?.ownerName}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Contact Number</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {vehicle?.ownerContact}
                  </dd>
                </div>
                {vehicle?.emergencyContact && (
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Emergency Contact</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {vehicle.emergencyContact}
                    </dd>
                  </div>
                )}
                {vehicle?.ownerAddress && (
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {vehicle.ownerAddress}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Please use this information responsibly and only for the purpose you specified in your request.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex items-center">
              <X className="h-6 w-6 text-red-500 mr-2" />
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Request Rejected
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <p className="text-sm text-gray-500">
                Your request to access the vehicle owner's information has been rejected. 
                This could be due to insufficient verification or the owner has denied the request.
              </p>
              <div className="mt-4">
                <button
                  onClick={() => {
                    setRequestId(null);
                    setRequestStatus(null);
                    setImageFile(null);
                    setImagePreview(null);
                    setDescription('');
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyAccess;