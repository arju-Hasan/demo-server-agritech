const mongoose = require("mongoose");

const forumPostSchema = new mongoose.Schema({
  // Basic Info
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  
  // Author
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
  // Category
  category: {
    type: String,
    enum: ["crop-advice", "pest-disease", "soil-fertilizer", "irrigation", "machinery", "market", "weather", "general"],
    required: true,
  },
  
  // Status
  status: {
    type: String,
    enum: ["open", "closed", "solved"],
    default: "open",
  },
  isSolved: {
    type: Boolean,
    default: false,
  },
  solvedBy: mongoose.Schema.Types.ObjectId,
  
  // Engagement
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  
  // Comments count
  commentCount: {
    type: Number,
    default: 0,
  },
  
  // Pinned post
  isPinned: {
    type: Boolean,
    default: false,
  },
  
  // Priority
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
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

module.exports = mongoose.model("ForumPost", forumPostSchema);
