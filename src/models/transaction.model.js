const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    unique: true,
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // Transaction details
  type: {
    type: String,
    enum: ["purchase", "refund", "manual"],
    default: "purchase",
  },
  category: {
    type: String,
    enum: ["product_sale", "service_charge", "refund", "adjustment"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  // Payment details
  paymentMethod: {
    type: String,
    enum: ["card", "mobile_banking", "bank_transfer", "cash_on_delivery", "wallet"],
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed", "cancelled"],
    default: "pending",
  },
  // Payment gateway details
  gatewayResponse: {
    transactionCode: String,
    referenceNumber: String,
    description: String,
    rawResponse: mongoose.Schema.Types.Mixed,
  },
  // Income/Expense tracking (for financial dashboard)
  incomeExpense: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  description: String,
  notes: String,
  rawResponse: String,
  // Metadata
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
transactionSchema.index({ userId: 1 });
transactionSchema.index({ orderId: 1 });
transactionSchema.index({ status: 1 });
transactionSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Transaction", transactionSchema);
