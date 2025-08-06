#!/usr/bin/env node

// Railway Startup Script - Handles all deployment issues
console.log('🚀 Railway Startup Script Starting...');

// Check environment variables
console.log('📋 Environment Check:');
console.log('- NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('- PORT:', process.env.PORT || 'not set');
console.log('- MONGO_URI:', process.env.MONGO_URI ? 'set' : 'not set');
console.log('- JWT_SECRET:', process.env.JWT_SECRET ? 'set' : 'not set');

// Check if we're in production
const isProduction = process.env.NODE_ENV === 'production';
console.log('- Production Mode:', isProduction);

// Import dependencies with error handling
let express, mongoose, cors, dotenv;

try {
  console.log('📦 Loading dependencies...');
  express = require('express');
  mongoose = require('mongoose');
  cors = require('cors');
  dotenv = require('dotenv');
  console.log('✅ All dependencies loaded successfully');
} catch (error) {
  console.error('❌ Failed to load dependencies:', error.message);
  console.error('📋 Make sure all dependencies are installed');
  process.exit(1);
}

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// CORS configuration for Railway
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://aarakshak.vercel.app',
    'https://aarakshak-frontend.vercel.app',
    'https://aarakshak-git-main-kausiknelge.vercel.app',
    'https://aarakshak-kausiknelge.vercel.app',
    'https://optimistic-smile-production.up.railway.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Handle preflight requests
app.options('*', cors(corsOptions));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Aarakshak Backend',
    platform: 'Railway',
    port: process.env.PORT || 3000,
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Aarakshak Backend API is running',
    health: '/api/health',
    auth: '/api/auth',
    security: '/api/security',
    timestamp: new Date().toISOString(),
    port: process.env.PORT || 3000
  });
});

// Simple test endpoint
app.get('/test', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Test endpoint working',
    timestamp: new Date().toISOString()
  });
});

// Load routes with error handling
try {
  console.log('🔄 Loading routes...');
  const authRoutes = require('./routes/auth');
  const securityRoutes = require('./routes/security');
  const apiRoutes = require('./routes/api');
  
  app.use('/api/auth', authRoutes);
  app.use('/api/security', securityRoutes);
  app.use('/api', apiRoutes);
  console.log('✅ Routes loaded successfully');
} catch (error) {
  console.error('❌ Failed to load routes:', error.message);
  console.error('📋 Check if all route files exist and have correct syntax');
  process.exit(1);
}

// MongoDB connection function
async function connectToMongoDB() {
  try {
    if (!process.env.MONGO_URI) {
      console.warn('⚠️ MONGO_URI not set - MongoDB connection will be skipped');
      return;
    }
    
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      socketTimeoutMS: 45000,
    });
    console.log("✅ Connected to MongoDB successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    console.error("📋 Make sure MONGO_URI environment variable is set correctly");
    // Continue running even if MongoDB fails
  }
}

// Start server function
async function startServer() {
  try {
    console.log('🔄 Starting server...');
    
    // Connect to MongoDB first
    await connectToMongoDB();
    
    // Start the server
    const PORT = process.env.PORT || 3000;
         const server = app.listen(PORT, '0.0.0.0', () => {
       console.log(`🚀 Server running on port ${PORT}`);
       console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
       console.log(`🔗 Health check: https://optimistic-smile-production.up.railway.app/api/health`);
       console.log(`🌐 Railway domain: https://optimistic-smile-production.up.railway.app`);
       console.log('✅ Railway deployment successful!');
     });

    // Handle server errors
    server.on('error', (error) => {
      console.error('❌ Server error:', error);
      process.exit(1);
    });

    // Add Railway-specific error handling
    process.on('uncaughtException', (error) => {
      console.error('❌ Uncaught Exception:', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('🛑 SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('🛑 SIGINT received, shutting down gracefully');
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the application
startServer(); 