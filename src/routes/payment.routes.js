const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");
const { authenticate } = require("../middlewares/auth.middleware");

// Create payment intent
router.post("/create-intent", paymentController.createPaymentIntent);

// Confirm payment
router.post("/confirm", authenticate, paymentController.confirmPayment);

// Get user subscription status
router.get(
  "/subscription/:userId",
  authenticate,
  paymentController.getSubscription,
);

module.exports = router;
