#!/usr/bin/env node

// Ultra Simple Railway Server - Guaranteed to work
console.log('🚀 Ultra Simple Railway Server Starting...');

const http = require('http');

const server = http.createServer((req, res) => {
  console.log(`📥 Request: ${req.method} ${req.url}`);
  
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.url === '/') {
    res.writeHead(200);
    res.end(JSON.stringify({
      message: 'Ultra Simple Railway Server Running',
      status: 'OK',
      timestamp: new Date().toISOString(),
      port: process.env.PORT || 3000
    }));
  } else if (req.url === '/health') {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: 'OK',
      timestamp: new Date().toISOString(),
      service: 'Ultra Simple Server'
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
  console.log(`✅ Ultra simple server running on port ${PORT}`);
  console.log(`🌐 Railway domain: https://optimistic-smile-production.up.railway.app`);
  console.log('✅ Railway deployment successful!');
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

console.log('✅ Ultra simple server setup complete'); 