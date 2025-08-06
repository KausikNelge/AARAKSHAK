#!/usr/bin/env node

// Bulletproof Railway Server - Designed to work on Railway
console.log('🚀 Bulletproof Railway Server Starting...');

// Import only what we need
const express = require('express');
const cors = require('cors');

// Create app
const app = express();

// Basic middleware
app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true
}));

// Root endpoint - ALWAYS works
app.get('/', (req, res) => {
  res.json({
    message: 'Aarakshak Backend API is running',
    status: 'OK',
    timestamp: new Date().toISOString(),
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health endpoint - ALWAYS works
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Aarakshak Backend',
    platform: 'Railway'
  });
});

// API health endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Aarakshak Backend',
    platform: 'Railway',
    port: process.env.PORT || 3000
  });
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Test endpoint working',
    timestamp: new Date().toISOString()
  });
});

// Start server
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: https://optimistic-smile-production.up.railway.app/health`);
  console.log(`🌐 Railway domain: https://optimistic-smile-production.up.railway.app`);
  console.log('✅ Railway deployment successful!');
});

// Error handling
server.on('error', (error) => {
  console.error('❌ Server error:', error);
  process.exit(1);
});

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

console.log('✅ Bulletproof server setup complete'); 