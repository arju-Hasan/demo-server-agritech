const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planId: {
      type: String,
      enum: ["starter", "professional", "enterprise"],
      required: true,
    },
    paymentIntentId: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "BDT",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "expired", "cancelled"],
      default: "active",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
    paymentMethod: {
      type: String,
    },
    renewalDate: {
      type: Date,
    },
    autoRenew: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Index for user lookup
subscriptionSchema.index({ userId: 1 });
subscriptionSchema.index({ status: 1 });

module.exports = mongoose.model("Subscription", subscriptionSchema);
