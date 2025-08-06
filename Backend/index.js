require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const securityRoutes = require('./routes/security');
const apiRoutes = require('./routes/api');
const { log } = require('console');
const app = express();

// Production CORS configuration for Railway
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

app.use('/api/auth', authRoutes);
app.use('/api/security', securityRoutes);
app.use('/api', apiRoutes);

// Health check endpoint for Railway
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

// Simple root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Aarakshak Backend API is running',
    health: '/api/health',
    auth: '/api/auth',
    security: '/api/security'
  });
});

async function main() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not set');
    }
    
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    console.error("📋 Make sure MONGO_URI environment variable is set correctly");
    // Continue running even if MongoDB fails initially
  }
}

// Start MongoDB connection
main();

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Railway domain: https://optimistic-smile-production.up.railway.app`);
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

 
