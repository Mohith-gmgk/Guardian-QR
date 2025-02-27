import React, { createContext, useState, useContext, useEffect } from 'react';
import { Vehicle, EmergencyRequest } from '../types';
import { useAuth } from './AuthContext';

interface VehicleContextType {
  vehicles: Vehicle[];
  emergencyRequests: EmergencyRequest[];
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'userId'>) => void;
  getVehicleById: (id: string) => Vehicle | undefined;
  getUserVehicles: () => Vehicle[];
  createEmergencyRequest: (request: Omit<EmergencyRequest, 'id' | 'timestamp' | 'status'>) => string;
  approveEmergencyRequest: (id: string) => void;
  getEmergencyRequestById: (id: string) => EmergencyRequest | undefined;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const useVehicle = () => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error('useVehicle must be used within a VehicleProvider');
  }
  return context;
};

export const VehicleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const storedVehicles = localStorage.getItem('vehicles');
    return storedVehicles ? JSON.parse(storedVehicles) : [];
  });

  const [emergencyRequests, setEmergencyRequests] = useState<EmergencyRequest[]>(() => {
    const storedRequests = localStorage.getItem('emergencyRequests');
    return storedRequests ? JSON.parse(storedRequests) : [];
  });

  useEffect(() => {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('emergencyRequests', JSON.stringify(emergencyRequests));
  }, [emergencyRequests]);

  const addVehicle = (vehicleData: Omit<Vehicle, 'id' | 'userId'>) => {
    if (!currentUser) return;
    
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: crypto.randomUUID(),
      userId: currentUser.id
    };
    
    setVehicles(prev => [...prev, newVehicle]);
  };

  const getVehicleById = (id: string) => {
    return vehicles.find(v => v.id === id);
  };

  const getUserVehicles = () => {
    if (!currentUser) return [];
    return vehicles.filter(v => v.userId === currentUser.id);
  };

  const createEmergencyRequest = (requestData: Omit<EmergencyRequest, 'id' | 'timestamp' | 'status'>) => {
    const newRequest: EmergencyRequest = {
      ...requestData,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      status: 'pending'
    };
    
    setEmergencyRequests(prev => [...prev, newRequest]);
    return newRequest.id;
  };

  const approveEmergencyRequest = (id: string) => {
    setEmergencyRequests(prev => 
      prev.map(req => 
        req.id === id ? { ...req, status: 'approved' } : req
      )
    );
  };

  const getEmergencyRequestById = (id: string) => {
    return emergencyRequests.find(r => r.id === id);
  };

  return (
    <VehicleContext.Provider value={{ 
      vehicles, 
      emergencyRequests,
      addVehicle, 
      getVehicleById, 
      getUserVehicles,
      createEmergencyRequest,
      approveEmergencyRequest,
      getEmergencyRequestById
    }}>
      {children}
    </VehicleContext.Provider>
  );
};