const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
require('dotenv').config();

const createTestUser = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/aarakshak';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB");

    // Check if user already exists
    const existingUser = await User.findOne({ email: 'kausik@example.com' });
    if (existingUser) {
      console.log("⚠️ User already exists, updating password...");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);
      existingUser.password = hashedPassword;
      await existingUser.save();
      console.log("✅ User password updated");
    } else {
      console.log("🌱 Creating new test user...");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);
      
      const newUser = new User({
        username: 'kausik',
        email: 'kausik@example.com',
        password: hashedPassword
      });
      
      await newUser.save();
      console.log("✅ Test user created successfully");
    }

    console.log("\n📧 Test User Credentials:");
    console.log("Email: kausik@example.com");
    console.log("Password: password123");

    await mongoose.connection.close();
    console.log("✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error creating user:", error);
  }
};

createTestUser(); 