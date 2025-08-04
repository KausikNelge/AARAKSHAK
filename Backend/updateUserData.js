const mongoose = require('mongoose');
const User = require('./models/User');
const SecurityData = require('./models/SecurityData');
require('dotenv').config();

// Generate realistic security data for a specific user
const generateUserSecurityData = (userId) => {
  const now = new Date();
  
  // Generate incident trends for the last 30 days with realistic patterns
  const incidentTrends = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    // Create realistic patterns with some variation
    const baseCount = 18;
    const variation = Math.floor(Math.random() * 25) - 12; // -12 to +12
    const dayOfWeek = date.getDay();
    const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.6 : 1; // Fewer incidents on weekends
    
    incidentTrends.push({
      date: date,
      count: Math.max(6, Math.floor((baseCount + variation) * weekendFactor))
    });
  }

  return {
    userId: userId,
    threatCategories: {
      malware: Math.floor(Math.random() * 50) + 25, // 25-74
      phishing: Math.floor(Math.random() * 40) + 20, // 20-59
      ddos: Math.floor(Math.random() * 25) + 10, // 10-34
      insider: Math.floor(Math.random() * 18) + 8, // 8-25
      social: Math.floor(Math.random() * 35) + 15 // 15-49
    },
    vulnerabilityCounts: {
      critical: Math.floor(Math.random() * 8) + 4, // 4-11
      high: Math.floor(Math.random() * 15) + 12, // 12-26
      medium: Math.floor(Math.random() * 25) + 20, // 20-44
      low: Math.floor(Math.random() * 30) + 30 // 30-59
    },
    incidentTrends: incidentTrends,
    complianceScores: {
      overall: Math.floor(Math.random() * 20) + 80, // 80-99
      network: Math.floor(Math.random() * 15) + 85, // 85-99
      application: Math.floor(Math.random() * 20) + 80, // 80-99
      data: Math.floor(Math.random() * 10) + 90, // 90-99
      physical: Math.floor(Math.random() * 25) + 75 // 75-99
    },
    riskLevels: {
      critical: Math.floor(Math.random() * 4) + 2, // 2-5
      high: Math.floor(Math.random() * 8) + 6, // 6-13
      medium: Math.floor(Math.random() * 12) + 12, // 12-23
      low: Math.floor(Math.random() * 15) + 18 // 18-32
    },
    lastUpdated: now
  };
};

// Update user data function
const updateUserData = async (email) => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/aarakshak';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB");

    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("❌ User not found with email:", email);
      console.log("Creating user with email:", email);
      
      // Create user if not exists
      const newUser = new User({
        username: "kausik",
        email: email,
        password: "$2b$10$dummyhashforsecurity" // Dummy hash
      });
      await newUser.save();
      console.log("✅ User created successfully");
    }

    const targetUser = await User.findOne({ email: email });
    console.log("📊 Found user:", targetUser.username, "with ID:", targetUser._id.toString());

    // Generate security data for this user
    const securityData = generateUserSecurityData(targetUser._id);
    
    // Update or create security data
    const existingData = await SecurityData.findOne({ userId: targetUser._id });
    if (existingData) {
      console.log("⚠️ Security data already exists, updating...");
      await SecurityData.findOneAndUpdate(
        { userId: targetUser._id },
        securityData,
        { new: true }
      );
    } else {
      console.log("🌱 Creating new security data...");
      const newSecurityData = new SecurityData(securityData);
      await newSecurityData.save();
    }

    console.log("✅ Security data updated successfully for user:", email);
    
    // Display the generated data
    const finalData = await SecurityData.findOne({ userId: targetUser._id });
    console.log("\n📈 Security Data for", email + ":");
    console.log("Total Threats:", Object.values(finalData.threatCategories).reduce((a, b) => a + b, 0));
    console.log("Critical Vulnerabilities:", finalData.vulnerabilityCounts.critical);
    console.log("Compliance Score:", finalData.complianceScores.overall + "%");
    console.log("Recent Incidents (last 7 days):", finalData.incidentTrends.slice(-7).map(t => t.count));
    console.log("Threat Categories:", finalData.threatCategories);
    console.log("Vulnerability Counts:", finalData.vulnerabilityCounts);
    console.log("Risk Levels:", finalData.riskLevels);

    await mongoose.connection.close();
    console.log("✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error updating user data:", error);
    process.exit(1);
  }
};

// Run the update function
if (require.main === module) {
  const email = process.argv[2] || 'kausik@example.com';
  updateUserData(email);
}

module.exports = { updateUserData, generateUserSecurityData }; 