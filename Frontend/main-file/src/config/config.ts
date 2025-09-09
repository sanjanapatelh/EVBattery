// Configuration file for the application
export const config = {
  // API Configuration
  api: {
    baseURL: 'http://localhost:3000', // Backend API server running on port 3000
    timeout: 10000, // 10 seconds
  },
  
  // App Configuration
  app: {
    name: 'EV Battery Management System',
    version: '1.0.0',
  },
  
  // Development Configuration
  dev: {
    isDevelopment: import.meta.env.DEV,
    enableLogging: import.meta.env.DEV,
  },
};

export default config;
