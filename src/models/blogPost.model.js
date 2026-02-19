const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  // Basic Info
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  
  // Author
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
  // Categories & Tags
  category: {
    type: String,
    enum: ["farming-tips", "crop-guide", "pest-management", "soil-health", "weather", "market-insights", "success-story", "technology"],
    required: true,
  },
  tags: [String],
  
  // Image
  image: {
    type: String,
    required: false,
  },
  
  // Engagement
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  views: {
    type: Number,
    default: 0,
  },
  
  // Publishing
  isPublished: {
    type: Boolean,
    default: false,
  },
  publishedAt: Date,
  
  // SEO
  metaTitle: String,
  metaDescription: String,
  metaKeywords: String,
  
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

module.exports = mongoose.model("BlogPost", blogPostSchema);
