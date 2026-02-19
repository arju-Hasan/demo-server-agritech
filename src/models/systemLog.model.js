const mongoose = require("mongoose");

const systemLogSchema = new mongoose.Schema({
  // Log type
  type: {
    type: String,
    enum: ["error", "warning", "info", "debug", "user_action"],
    required: true,
  },
  
  // Category
  category: {
    type: String,
    required: true,
  },
  
  // Message
  message: {
    type: String,
    required: true,
  },
  
  // User info (if applicable)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  
  // Request info
  ipAddress: String,
  userAgent: String,
  url: String,
  method: String,
  
  // Error details
  errorDetails: {
    stack: String,
    code: String,
  },
  
  // Status code
  statusCode: Number,
  
  // Additional data
  metadata: mongoose.Schema.Types.Mixed,
  
  // Severity
  severity: {
    type: String,
    enum: ["critical", "high", "medium", "low"],
    default: "medium",
  },
  
  // Timestamp
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
  
  // Resolved flag
  isResolved: {
    type: Boolean,
    default: false,
  },
  resolvedAt: Date,
  resolvedBy: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("SystemLog", systemLogSchema);
