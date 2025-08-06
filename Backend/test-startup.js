// Simple startup test for Railway
console.log('🚀 Starting Aarakshak Backend Test...');

// Test 1: Environment variables
console.log('📋 Environment Check:');
console.log('- NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('- PORT:', process.env.PORT || 'not set');
console.log('- MONGO_URI:', process.env.MONGO_URI ? 'set' : 'not set');
console.log('- JWT_SECRET:', process.env.JWT_SECRET ? 'set' : 'not set');

// Test 2: Basic Express server
try {
  const express = require('express');
  console.log('✅ Express loaded successfully');
  
  const app = express();
  app.get('/', (req, res) => {
    res.json({ message: 'Test server running', timestamp: new Date().toISOString() });
  });
  
  const PORT = process.env.PORT || 3000;
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Test server running on port ${PORT}`);
    console.log('🎉 Startup test completed successfully!');
    process.exit(0);
  });
  
  server.on('error', (error) => {
    console.error('❌ Server error:', error);
    process.exit(1);
  });
  
} catch (error) {
  console.error('❌ Startup error:', error);
  process.exit(1);
} 