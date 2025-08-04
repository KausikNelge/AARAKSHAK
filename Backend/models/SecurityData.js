const mongoose = require('mongoose');

const securityDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  threatCategories: {
    malware: { type: Number, default: 0 },
    phishing: { type: Number, default: 0 },
    ddos: { type: Number, default: 0 },
    insider: { type: Number, default: 0 },
    social: { type: Number, default: 0 }
  },
  vulnerabilityCounts: {
    critical: { type: Number, default: 0 },
    high: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    low: { type: Number, default: 0 }
  },
  incidentTrends: [{
    date: { type: Date, default: Date.now },
    count: { type: Number, default: 0 }
  }],
  complianceScores: {
    overall: { type: Number, default: 0 },
    network: { type: Number, default: 0 },
    application: { type: Number, default: 0 },
    data: { type: Number, default: 0 },
    physical: { type: Number, default: 0 }
  },
  riskLevels: {
    critical: { type: Number, default: 0 },
    high: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    low: { type: Number, default: 0 }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SecurityData', securityDataSchema); 