const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  bannedName: String,

  // Crop details
  description: String,
  
  cropCategory: {
    type: String,
    enum: ["cereal", "pulse", "vegetable", "fruit", "spice", "herb"],
    required: true,
  },

  // Growing season and climate
  season: {
    type: String,
    enum: ["kharif", "rabi", "summer", "winter"],
    required: true,
  },

  climate: {
    minTemperature: Number,
    maxTemperature: Number,
    minRainfall: Number,
    maxRainfall: Number,
    humidity: String,
  },

  // Soil requirements
  soilRequirements: {
    soilType: [String],
    pH: {
      min: Number,
      max: Number,
    },
    fertility: String,
  },

  // Growth information
  growthStages: [
    {
      name: String,
      daysFromSowing: Number,
      description: String,
    },
  ],

  harvestingInfo: {
    harvestTime: String,
    harvestStage: String,
    yield: String,
  },

  // Pest and disease information
  commonPests: [String],
  commonDiseases: [String],

  // Market information
  marketPrice: {
    minPrice: Number,
    maxPrice: Number,
    lastUpdated: Date,
  },

  // Image
  image: String,

  // Metadata
  isActive: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Crop", cropSchema);
