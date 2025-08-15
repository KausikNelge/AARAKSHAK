require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const securityRoutes = require('./routes/security');
const apiRoutes = require('./routes/api');
const { log } = require('console');
const app = express();

// Dynamic CORS configuration based on environment
const getCorsOrigins = () => {
  const defaultOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://aarakshak.vercel.app',
    'https://aarakshak-frontend.vercel.app',
    'https://aarakshak-git-main-kausiknelge.vercel.app',
    'https://aarakshak-kausiknelge.vercel.app'
  ];
  
  // Add production Railway URL if in production
  if (process.env.NODE_ENV === 'production') {
    defaultOrigins.push('https://optimistic-smile-production.up.railway.app');
  }
  
  // Add custom origins from environment variable
  if (process.env.CORS_ORIGINS) {
    const customOrigins = process.env.CORS_ORIGINS.split(',').map(origin => origin.trim());
    defaultOrigins.push(...customOrigins);
  }
  
  return defaultOrigins;
};

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = getCorsOrigins();
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api/security', securityRoutes);
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Aarakshak Backend',
    platform: process.env.NODE_ENV === 'production' ? 'Railway' : 'Docker Local',
    port: process.env.PORT || 3000,
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV || 'development',
    cors_origins: getCorsOrigins()
  });
});

// Simple root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Aarakshak Backend API is running',
    environment: process.env.NODE_ENV || 'development',
    platform: process.env.NODE_ENV === 'production' ? 'Railway' : 'Docker Local',
    health: '/api/health',
    auth: '/api/auth',
    security: '/api/security'
  });
});

// Temporary ping route to check if server is alive
app.get('/ping', (req, res) => {
  res.send('pong');
});

async function main() {
  try {
    console.log('🔄 Starting Aarakshak Backend...');
    console.log('📋 Environment:', process.env.NODE_ENV || 'development');
    console.log('🔗 Port:', process.env.PORT || 3000);
    console.log('🌐 Platform:', process.env.NODE_ENV === 'production' ? 'Railway' : 'Docker Local');
    
    if (!process.env.MONGO_URI) {
      console.warn('⚠️ MONGO_URI not set - MongoDB connection will be skipped');
    } else {
      console.log('🔄 Connecting to MongoDB Atlas...');
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log("✅ Connected to MongoDB Atlas successfully");
    }
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    console.error("📋 Make sure MONGO_URI environment variable is set correctly");
    // Continue running even if MongoDB fails
  }
}
console.log('✅ Backend entry point reached');

// Start MongoDB connection
main();

// Start the server with better error handling
const PORT = process.env.PORT || 3000;

try {
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Platform: ${process.env.NODE_ENV === 'production' ? 'Railway' : 'Docker Local'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    
    if (process.env.NODE_ENV === 'production') {
    console.log(`🌐 Railway domain: https://optimistic-smile-production.up.railway.app`);
    } else {
      console.log(`🌐 Local Docker: http://localhost:3001`);
    }
  });

  // Handle server errors
  server.on('error', (error) => {
    console.error('❌ Server error:', error);
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

 console.log('✅ Server startup complete');

