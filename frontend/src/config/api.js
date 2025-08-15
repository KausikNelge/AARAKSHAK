// API Configuration for different environments
const API_CONFIG = {
  // Development - Local Docker Backend
  development: {
    baseURL: 'http://localhost:3001',
    timeout: 10000,
  },
  // Production - Railway Backend
  production: {
    baseURL: 'https://optimistic-smile-production.up.railway.app',
    timeout: 15000,
  }
};

// Get current environment
const getEnvironment = () => {
  // Check if we're in development mode
  if (process.env.NODE_ENV === 'development') {
    return 'development';
  }
  
  // Check if we're running locally (localhost)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'development';
  }
  
  // Default to production
  return 'production';
};

// Get current API configuration
const getApiConfig = () => {
  const env = getEnvironment();
  return API_CONFIG[env] || API_CONFIG.production;
};

// Create axios instance with current configuration
const createApiInstance = () => {
  const config = getApiConfig();
  
  // Import axios dynamically to avoid SSR issues
  const axios = require('axios');
  
  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // Add request interceptor for authentication
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Add response interceptor for error handling
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
  
  return instance;
};

export { getApiConfig, createApiInstance, getEnvironment };
export default createApiInstance; 