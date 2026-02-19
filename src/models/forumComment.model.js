const mongoose = require("mongoose");

const forumCommentSchema = new mongoose.Schema({
  // Post reference
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ForumPost",
    required: true,
  },
  
  // Author
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
  // Content
  content: {
    type: String,
    required: true,
  },
  
  // Parent comment (for replies)
  parentCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ForumComment",
    default: null,
  },
  
  // Replies
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ForumComment",
  }],
  
  // Engagement
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  
  // Mark as helpful solution
  isMarkedAsAnswer: {
    type: Boolean,
    default: false,
  },
  
  // Moderation
  isModerated: {
    type: Boolean,
    default: false,
  },
  isHidden: {
    type: Boolean,
    default: false,
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

module.exports = mongoose.model("ForumComment", forumCommentSchema);
