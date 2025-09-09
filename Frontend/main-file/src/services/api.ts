// API service for communicating with the backend
import { config } from '../config/config';

const API_BASE_URL = config.api.baseURL;

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

// Battery API functions
export const batteryAPI = {
  // Create a new battery
  createBattery: (data: {
    externalId: string;
    universalId: string;
    batteryTypeId: string;
    manufacturerId: string;
    createdAt: string;
  }) => apiRequest('/battery', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Create a new battery type
  createBatteryType: (data: {
    universalId: string;
    code: string;
    description: string;
    chemistry: string;
    capacity: number;
    voltage: number;
    manufacturerId: string;
  }) => apiRequest('/battery/types', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Test a battery
  testBattery: (data: {
    batteryId: string;
    testerId: string;
    result: string;
    date: string;
  }) => apiRequest('/battery/test', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Recycle a battery
  recycleBattery: (data: {
    batteryId: string;
    recyclerId: string;
    updatedAt: string;
  }) => apiRequest('/battery/recycle', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Get battery by ID
  getBattery: (id: string) => apiRequest(`/battery/${id}`),
};

// EV API functions
export const evAPI = {
  // Create a new EV
  createEV: (data: {
    batteryId: string;
    externalId: string;
    universalId: string;
    manufacturerId: string;
    createdAt: string;
  }) => apiRequest('/ev', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Get all EVs (with optional filters)
  getEVs: (params?: { manufacturerId?: string; ownerId?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.manufacturerId) queryParams.append('manufacturerId', params.manufacturerId);
    if (params?.ownerId) queryParams.append('ownerId', params.ownerId);
    
    const queryString = queryParams.toString();
    return apiRequest(`/ev${queryString ? `?${queryString}` : ''}`);
  },

  // Get EV by ID
  getEV: (id: string) => apiRequest(`/ev/${id}`),

  // Transfer EV ownership
  transferEV: (data: {
    evId: string;
    newOwnerId: string;
    updatedAt: string;
  }) => apiRequest('/ev/transfer', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Get EV owner by ID
  getEVOwner: (id: string) => apiRequest(`/ev/owner/${id}`),

  // Get all EV owners
  getAllEVOwners: () => apiRequest('/ev/owners'),
};

// Manufacturer API functions
export const manufacturerAPI = {
  // Get all battery manufacturers
  getAllBatteryManufacturers: () => apiRequest('/manufacturer/battery-manufacturers'),
  
  // Get battery manufacturer by ID
  getBatteryManufacturer: (id: string) => apiRequest(`/manufacturer/battery/${id}`),
  
  // Get EV manufacturer by ID
  getEVManufacturer: (id: string) => apiRequest(`/manufacturer/ev/${id}`),
};

// Recycler API functions
export const recyclerAPI = {
  // Add recycler-specific endpoints here based on your recycler.js route
  // You can expand this based on your actual recycler routes
};

// Owner API functions
export const ownerAPI = {
  // Add owner-specific endpoints here based on your owner.js route
  // You can expand this based on your actual owner routes
};

// User Registration API functions - corrected endpoints to match backend
export const userAPI = {
  // Register Battery Manufacturer
  registerBatteryManufacturer: (data: {
    name: string;
    brand: string;
    username: string;
    password: string;
  }) => apiRequest('/manufacturer/register/battery-manufacturer', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Register EV Manufacturer
  registerEVManufacturer: (data: {
    name: string;
    brand: string;
    username: string;
    password: string;
  }) => apiRequest('/manufacturer/register/ev-manufacturer', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Register EV Consumer/Owner
  registerEVConsumer: (data: {
    name: string;
    address: string;
    username: string;
    password: string;
  }) => apiRequest('/manufacturer/register/ev-consumer', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Register Recycler
  registerRecycler: (data: {
    name: string;
    location: string;
    username: string;
    password: string;
  }) => apiRequest('/manufacturer/register/recycler', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Check username availability - corrected endpoint
  checkUsername: (username: string) => apiRequest(`/manufacturer/check-username?username=${username}`),
};

export default {
  battery: batteryAPI,
  ev: evAPI,
  manufacturer: manufacturerAPI,
  recycler: recyclerAPI,
  owner: ownerAPI,
  user: userAPI,
};
