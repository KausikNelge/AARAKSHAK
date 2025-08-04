const express = require('express');
const SecurityData = require('../models/SecurityData');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

const router = express.Router();

// Generate realistic security data
const generateSecurityData = (userId) => {
  const now = new Date();
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  // Generate incident trends for the last 7 days
  const incidentTrends = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    incidentTrends.push({
      date: date,
      count: Math.floor(Math.random() * 25) + 8 // 8-32 incidents per day
    });
  }

  return {
    userId: userId,
    threatCategories: {
      malware: Math.floor(Math.random() * 45) + 15, // 15-59
      phishing: Math.floor(Math.random() * 35) + 10, // 10-44
      ddos: Math.floor(Math.random() * 20) + 5, // 5-24
      insider: Math.floor(Math.random() * 15) + 3, // 3-17
      social: Math.floor(Math.random() * 30) + 8 // 8-37
    },
    vulnerabilityCounts: {
      critical: Math.floor(Math.random() * 8) + 2, // 2-9
      high: Math.floor(Math.random() * 15) + 8, // 8-22
      medium: Math.floor(Math.random() * 25) + 15, // 15-39
      low: Math.floor(Math.random() * 35) + 20 // 20-54
    },
    incidentTrends: incidentTrends,
    complianceScores: {
      overall: Math.floor(Math.random() * 25) + 75, // 75-99
      network: Math.floor(Math.random() * 20) + 80, // 80-99
      application: Math.floor(Math.random() * 25) + 75, // 75-99
      data: Math.floor(Math.random() * 15) + 85, // 85-99
      physical: Math.floor(Math.random() * 30) + 70 // 70-99
    },
    riskLevels: {
      critical: Math.floor(Math.random() * 4) + 1, // 1-4
      high: Math.floor(Math.random() * 8) + 3, // 3-10
      medium: Math.floor(Math.random() * 12) + 8, // 8-19
      low: Math.floor(Math.random() * 15) + 10 // 10-24
    },
    lastUpdated: now
  };
};

// Get security dashboard data
router.get('/dashboard', auth, async (req, res) => {
  try {
    let securityData = await SecurityData.findOne({ userId: req.userId });
    
    if (!securityData) {
      // Create realistic data if none exists
      const newData = generateSecurityData(req.userId);
      securityData = new SecurityData(newData);
      await securityData.save();
    } else {
      // Update existing data with fresh realistic values
      const updatedData = generateSecurityData(req.userId);
      securityData = await SecurityData.findOneAndUpdate(
        { userId: req.userId },
        updatedData,
        { new: true }
      );
    }

    res.json(securityData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update security data (for real-time updates)
router.put('/update', auth, async (req, res) => {
  try {
    const { threatCategories, vulnerabilityCounts, incidentTrends, complianceScores, riskLevels } = req.body;
    
    const securityData = await SecurityData.findOneAndUpdate(
      { userId: req.userId },
      {
        threatCategories,
        vulnerabilityCounts,
        incidentTrends,
        complianceScores,
        riskLevels,
        lastUpdated: new Date()
      },
      { new: true, upsert: true }
    );

    res.json(securityData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get incident trends for the last 30 days
router.get('/trends', auth, async (req, res) => {
  try {
    const securityData = await SecurityData.findOne({ userId: req.userId });
    
    if (!securityData) {
      return res.json({ trends: [] });
    }

    res.json({ trends: securityData.incidentTrends });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate fresh data (for testing)
router.post('/generate-data', auth, async (req, res) => {
  try {
    const newData = generateSecurityData(req.userId);
    const securityData = await SecurityData.findOneAndUpdate(
      { userId: req.userId },
      newData,
      { new: true, upsert: true }
    );

    res.json({ message: 'Data generated successfully', data: securityData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate fresh data without auth (for testing)
router.post('/generate-test-data', async (req, res) => {
  try {
    const testUserId = new mongoose.Types.ObjectId();
    const newData = generateSecurityData(testUserId);
    const securityData = await SecurityData.findOneAndUpdate(
      { userId: testUserId },
      newData,
      { new: true, upsert: true }
    );

    res.json({ 
      message: 'Test data generated successfully', 
      userId: testUserId.toString(),
      data: securityData 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate test data without authentication (for immediate testing)
router.get('/test-data', async (req, res) => {
  try {
    const testUserId = new mongoose.Types.ObjectId();
    const newData = generateSecurityData(testUserId);
    const securityData = new SecurityData(newData);
    await securityData.save();

    res.json({ 
      message: 'Test data generated successfully', 
      userId: testUserId.toString(),
      data: securityData 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get test dashboard data (no auth required)
router.get('/test-dashboard', async (req, res) => {
  try {
    const testUserId = new mongoose.Types.ObjectId();
    const newData = generateSecurityData(testUserId);
    
    res.json(newData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get detailed threat analysis
router.get('/threat-analysis', auth, async (req, res) => {
  try {
    const securityData = await SecurityData.findOne({ userId: req.userId });
    
    if (!securityData) {
      return res.json({ analysis: {} });
    }

    const analysis = {
      totalThreats: Object.values(securityData.threatCategories).reduce((a, b) => a + b, 0),
      threatDistribution: securityData.threatCategories,
      topThreat: Object.entries(securityData.threatCategories).reduce((a, b) => a[1] > b[1] ? a : b),
      riskScore: Math.floor(Math.random() * 40) + 60, // 60-99
      recommendations: [
        "Update antivirus signatures immediately",
        "Conduct security awareness training",
        "Review firewall rules",
        "Implement multi-factor authentication",
        "Monitor network traffic for anomalies"
      ]
    };

    res.json({ analysis });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 