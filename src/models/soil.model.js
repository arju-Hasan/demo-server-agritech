const mongoose = require("mongoose");

const soilAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
  // Soil Parameters
  soilData: {
    pH: {
      type: Number,
      required: true,
      min: 0,
      max: 14,
    },
    moisture: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    nitrogen: {
      type: Number,
      default: 0,
    },
    phosphorus: {
      type: Number,
      default: 0,
    },
    potassium: {
      type: Number,
      default: 0,
    },
    organicMatter: {
      type: Number,
      default: 0,
    },
    electricalConductivity: {
      type: Number,
      default: 0,
    },
    soilType: {
      type: String,
      enum: ["loamy", "clay", "sandy", "silt", "peat", "chalky"],
      default: "loamy",
    },
  },

  // Location Information
  location: {
    division: String,
    district: String,
    upazila: String,
    village: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },

  // Analysis Recommendations
  recommendations: {
    fertilizers: [
      {
        name: String,
        quantity: String,
        timing: String,
      },
    ],
    amendments: [String],
    crops: [String],
  },

  // Metadata
  analysisDate: {
    type: Date,
    default: Date.now,
  },
  laboratory: String,
  notes: String,

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

module.exports = mongoose.model("SoilAnalysis", soilAnalysisSchema);
