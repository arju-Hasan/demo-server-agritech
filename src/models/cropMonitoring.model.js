const mongoose = require("mongoose");

const cropMonitoringSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  cropId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Crop",
    required: true,
  },

  cropName: String,

  // Basic farming info
  farmSize: Number,
  plantingDate: {
    type: Date,
    required: true,
  },

  location: {
    division: String,
    district: String,
    upazila: String,
    field: String,
  },

  // Current state
  growthStage: String,
  healthStatus: {
    type: String,
    enum: ["excellent", "good", "fair", "poor"],
    default: "good",
  },

  // Activity log
  activities: [
    {
      date: Date,
      type: String,
      description: String,
      details: String,
    },
  ],

  // Expense tracking
  expenses: [
    {
      date: Date,
      category: String,
      amount: Number,
      description: String,
      itemsBought: String,
    },
  ],

  // Harvest records
  harvestRecord: {
    expectedHarvestDate: Date,
    harvestDate: Date,
    totalYield: Number,
    yieldUnit: String,
    quality: String,
    notes: String,
  },

  // Monitoring records
  monitoringRecords: [
    {
      date: Date,
      moisture: Number,
      temperature: Number,
      plantHeight: String,
      leafColor: String,
      pestObserved: [String],
      diseaseObserved: [String],
      notes: String,
    },
  ],

  // Status
  status: {
    type: String,
    enum: ["planning", "growing", "harvesting", "completed"],
    default: "planning",
  },

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

module.exports = mongoose.model("CropMonitoring", cropMonitoringSchema);
