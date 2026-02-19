const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: [
      "order_placed",
      "order_confirmed",
      "order_shipped",
      "order_delivered",
      "order_cancelled",
      "payment_received",
      "payment_failed",
      "product_review",
      "message_received",
      "system_alert",
      "promotion",
      "general"
    ],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  // Related references
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  relatedModel: {
    type: String,
    enum: ["Order", "Product", "Message", "User", "Review"],
  },
  // Status
  isRead: {
    type: Boolean,
    default: false,
  },
  readAt: Date,
  // Action link
  actionUrl: String,
  // Metadata
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
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

// Index for faster queries
notificationSchema.index({ userId: 1 });
notificationSchema.index({ isRead: 1 });
notificationSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Notification", notificationSchema);
