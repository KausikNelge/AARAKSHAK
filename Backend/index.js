require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes= require('./routes/auth');
const { log } = require('console');
const app = express();
app.use(cors());
app.use(express.json());
app.use('api/auth',authRoutes)
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
app.listen(prototype, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

 
