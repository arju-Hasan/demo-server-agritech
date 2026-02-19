const mongoose = require("mongoose");

const cropRecommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Input parameters
  inputData: {
    soilAnalysisId: mongoose.Schema.Types.ObjectId,
    farmSize: {
      type: Number,
      required: true,
    },
    season: String,
    budget: Number,
    location: {
      division: String,
      district: String,
      upazila: String,
    },
  },

  // Recommended crops with details
  recommendedCrops: [
    {
      cropId: mongoose.Schema.Types.ObjectId,
      cropName: String,
      suitabilityScore: Number,
      expectedYield: String,
      harvestTime: String,
      estimatedCost: Number,
      estimatedProfit: Number,
      riskLevel: String,
    },
  ],

  // Financial analysis
  financialAnalysis: {
    totalInvestment: Number,
    expectedRevenue: Number,
    expectedProfit: Number,
    roi: Number,
    breakEvenPoint: Number,
  },

  // Cultivation plan
  cultivationPlan: {
    seedingSchedule: String,
    irrigationSchedule: String,
    fertilizerSchedule: String,
    pestControlSchedule: String,
    harvestingTips: String,
  },

  // Risk analysis
  riskAnalysis: {
    weatherRisk: String,
    pestRisk: String,
    marketRisk: String,
    overallRisk: String,
    mitigation: [String],
  },

  // Market advisory
  marketAdvisory: {
    currentPrice: Number,
    priceGoal: Number,
    marketDemand: String,
    sellingChannels: [String],
    storageAdvice: String,
  },

  // Status
  status: {
    type: String,
    enum: ["pending", "selected", "completed"],
    default: "pending",
  },

  selectedCrop: mongoose.Schema.Types.ObjectId,

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CropRecommendation", cropRecommendationSchema);
