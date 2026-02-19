const mongoose = require("mongoose");

const diseaseDetectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  cropMonitoringId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CropMonitoring",
  },

  cropName: String,
  location: {
    division: String,
    district: String,
    upazila: String,
  },

  // Image data
  imageUrl: String,
  uploadDate: {
    type: Date,
    default: Date.now,
  },

  // Detection results
  detectionResults: {
    diseaseName: String,
    confidence: Number,
    severity: {
      type: String,
      enum: ["mild", "moderate", "severe"],
    },
    affectedArea: String,
  },

  // Treatment information
  treatment: {
    recommendedTreatment: [
      {
        method: String,
        description: String,
        steps: [String],
        duration: String,
      },
    ],
    pesticides: [
      {
        name: String,
        dosage: String,
        applicationMethod: String,
        precautions: String,
      },
    ],
    organicAlternatives: [String],
    preventiveMeasures: [String],
  },

  // Monitoring status
  status: {
    type: String,
    enum: ["detected", "under_treatment", "resolved"],
    default: "detected",
  },

  treatmentStartDate: Date,
  treatmentCompletionDate: Date,

  // Notes
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

module.exports = mongoose.model("DiseaseDetection", diseaseDetectionSchema);
