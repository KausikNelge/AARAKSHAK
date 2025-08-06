#!/usr/bin/env node

// Minimal Railway Test Server
console.log('🚀 Starting Minimal Railway Test Server...');

const http = require('http');

const server = http.createServer((req, res) => {
  console.log(`📥 Request: ${req.method} ${req.url}`);
  
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  if (req.url === '/') {
    res.writeHead(200);
    res.end(JSON.stringify({
      message: 'Minimal Railway Test Server Running',
      timestamp: new Date().toISOString(),
      port: process.env.PORT || 3000,
      environment: process.env.NODE_ENV || 'development'
    }));
  } else if (req.url === '/health') {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: 'OK',
      timestamp: new Date().toISOString(),
      service: 'Minimal Test Server',
      platform: 'Railway'
    }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({
      error: 'Not Found',
      available: ['/', '/health']
    }));
  }
});

const PORT = process.env.PORT || 3000;

 server.listen(PORT, '0.0.0.0', () => {
   console.log(`✅ Minimal server running on port ${PORT}`);
   console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
   console.log(`🔗 Test URL: https://optimistic-smile-production.up.railway.app/`);
   console.log(`🌐 Railway domain: https://optimistic-smile-production.up.railway.app`);
 });

server.on('error', (error) => {
  console.error('❌ Server error:', error);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

console.log('✅ Minimal server setup complete'); 