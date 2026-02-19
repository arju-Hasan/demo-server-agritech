const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Basic Info
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "management", "farmer", "seller"],
    default: "farmer",
  },
  status: {
    type: String,
    enum: ["active", "blocked", "pending"],
    default: "active",
  },
  // Profile Information
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    address: {
      division: String,
      district: String,
      upazila: String,
      village: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    avatar: String,
    nid: String,
  },
  // Role-specific data
  farmerData: {
    farmSize: Number,
    farmingExperience: Number,
    crops: [String],
    totalLand: Number,
  },
  sellerData: {
    businessName: String,
    businessType: {
      type: String,
      enum: ["seeds", "fertilizers", "tools", "equipment"],
    },
    tradeLicense: String,
    verified: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalSales: {
      type: Number,
      default: 0,
    },
  },
  // Security & Authentication
  refreshToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  // Activity Tracking
  lastLogin: Date,
  loginAttempts: {
    type: Number,
    default: 0,
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

// Index for faster queries
userSchema.index({ role: 1 });
userSchema.index({ status: 1 });
userSchema.index({ "sellerData.verified": 1 });

module.exports = mongoose.model("User", userSchema);
