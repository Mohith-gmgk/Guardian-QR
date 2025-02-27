export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Vehicle {
  id: string;
  userId: string;
  registrationNumber: string;
  model: string;
  color: string;
  ownerName: string;
  ownerContact: string;
  ownerAddress: string;
  emergencyContact: string;
}

export interface EmergencyRequest {
  id: string;
  vehicleId: string;
  requestType: 'accident' | 'parking' | 'payment' | 'other';
  imageUrl: string;
  timestamp: number;
  status: 'pending' | 'approved' | 'rejected';
  description: string;
}