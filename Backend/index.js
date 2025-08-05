require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const securityRoutes = require('./routes/security');
const apiRoutes = require('./routes/api');
const { log } = require('console');
const app = express();

// Production CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://aarakshak.vercel.app',
    'https://aarakshak-frontend.vercel.app',
    'https://aarakshak-git-main-kausiknelge.vercel.app',
    'https://aarakshak-kausiknelge.vercel.app'
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
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

main();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

 
