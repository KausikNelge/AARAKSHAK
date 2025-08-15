// API Configuration for different environments
const API_CONFIG = {
  // Development - Local Docker Backend (via ngrok for Vercel)
  development: {
    baseURL: 'http://localhost:3001', // Will be updated to ngrok URL for Vercel
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
  
  // Check if we're on Vercel but want to connect to local backend
  // This allows Vercel frontend to connect to local Docker backend via ngrok
  if (window.location.hostname.includes('vercel.app')) {
    // Check if we have a custom ngrok URL configured
    const ngrokUrl = localStorage.getItem('ngrok_url');
    if (ngrokUrl) {
      return 'development'; // Use development config but with ngrok URL
    }
  }
  
  // Default to production
  return 'production';
};

// Get current API configuration
const getApiConfig = () => {
  const env = getEnvironment();
  const config = API_CONFIG[env] || API_CONFIG.production;
  
  // If we're on Vercel and have an ngrok URL, use it
  if (env === 'development' && window.location.hostname.includes('vercel.app')) {
    const ngrokUrl = localStorage.getItem('ngrok_url');
    if (ngrokUrl) {
      return {
        ...config,
        baseURL: ngrokUrl
      };
    }
  }
  
  return config;
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

// Function to set ngrok URL for Vercel frontend
export const setNgrokUrl = (url) => {
  localStorage.setItem('ngrok_url', url);
  console.log('✅ Ngrok URL set for Vercel frontend:', url);
};

// Function to get current ngrok URL
export const getNgrokUrl = () => {
  return localStorage.getItem('ngrok_url');
};

// Function to clear ngrok URL
export const clearNgrokUrl = () => {
  localStorage.removeItem('ngrok_url');
  console.log('✅ Ngrok URL cleared');
};

export { getApiConfig, createApiInstance, getEnvironment };
export default createApiInstance; 