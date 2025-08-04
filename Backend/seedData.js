const mongoose = require('mongoose');
const SecurityData = require('./models/SecurityData');
require('dotenv').config();

// Generate realistic security data for seeding
const generateSeedData = (userId) => {
  const now = new Date();
  
  // Generate incident trends for the last 30 days
  const incidentTrends = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    // Create realistic patterns with some variation
    const baseCount = 15;
    const variation = Math.floor(Math.random() * 20) - 10; // -10 to +10
    const dayOfWeek = date.getDay();
    const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.7 : 1; // Fewer incidents on weekends
    
    incidentTrends.push({
      date: date,
      count: Math.max(5, Math.floor((baseCount + variation) * weekendFactor))
    });
  }

  return {
    userId: userId,
    threatCategories: {
      malware: Math.floor(Math.random() * 40) + 20, // 20-59
      phishing: Math.floor(Math.random() * 30) + 15, // 15-44
      ddos: Math.floor(Math.random() * 15) + 8, // 8-22
      insider: Math.floor(Math.random() * 12) + 5, // 5-16
      social: Math.floor(Math.random() * 25) + 12 // 12-36
    },
    vulnerabilityCounts: {
      critical: Math.floor(Math.random() * 6) + 3, // 3-8
      high: Math.floor(Math.random() * 12) + 10, // 10-21
      medium: Math.floor(Math.random() * 20) + 18, // 18-37
      low: Math.floor(Math.random() * 25) + 25 // 25-49
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
      critical: Math.floor(Math.random() * 3) + 2, // 2-4
      high: Math.floor(Math.random() * 6) + 5, // 5-10
      medium: Math.floor(Math.random() * 10) + 10, // 10-19
      low: Math.floor(Math.random() * 12) + 15 // 15-26
    },
    lastUpdated: now
  };
};

// Seed data function
const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/aarakshak';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB");

    // Create a sample user ID for seeding
    const sampleUserId = new mongoose.Types.ObjectId();
    
    // Check if data already exists
    const existingData = await SecurityData.findOne({ userId: sampleUserId });
    if (existingData) {
      console.log("⚠️ Data already exists, updating...");
      await SecurityData.findOneAndUpdate(
        { userId: sampleUserId },
        generateSeedData(sampleUserId),
        { new: true }
      );
    } else {
      console.log("🌱 Creating new seed data...");
      const seedData = new SecurityData(generateSeedData(sampleUserId));
      await seedData.save();
    }

    console.log("✅ Seed data created/updated successfully");
    console.log("📊 Sample User ID for testing:", sampleUserId.toString());
    
    // Display sample data
    const data = await SecurityData.findOne({ userId: sampleUserId });
    console.log("\n📈 Sample Security Data:");
    console.log("Total Threats:", Object.values(data.threatCategories).reduce((a, b) => a + b, 0));
    console.log("Critical Vulnerabilities:", data.vulnerabilityCounts.critical);
    console.log("Compliance Score:", data.complianceScores.overall + "%");
    console.log("Recent Incidents:", data.incidentTrends.slice(-7).map(t => t.count));

    await mongoose.connection.close();
    console.log("✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

// Run the seed function
if (require.main === module) {
  seedData();
}

module.exports = { seedData, generateSeedData }; 