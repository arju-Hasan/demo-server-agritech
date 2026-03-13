const Subscription = require("../models/subscription.model");
const User = require("../models/user.model");

// Initialize Stripe lazily to ensure env variables are loaded
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY not found in environment variables");
  }
  return require("stripe")(process.env.STRIPE_SECRET_KEY);
};

// Create payment intent
exports.createPaymentIntent = async (req, res) => {
  try {
    const stripe = getStripe();
    const { planId, amount, userInfo } = req.body;

    if (!planId || !amount || !userInfo) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: "bdt", // Change if needed
      metadata: {
        planId: planId,
        userEmail: userInfo.email,
        userName: userInfo.fullName,
      },
      description: `Plan: ${planId}`,
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Payment intent error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Confirm payment and create subscription
exports.confirmPayment = async (req, res) => {
  try {
    const stripe = getStripe();
    const { paymentIntentId, planId, userInfo } = req.body;
    const userId = req.user?._id;

    if (!paymentIntentId || !planId || !userInfo) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        error: "Payment not successful",
        status: paymentIntent.status,
      });
    }

    // Get or create user
    let user = await User.findOne({ email: userInfo.email });

    if (!user) {
      user = await User.create({
        email: userInfo.email,
        fullName: userInfo.fullName,
        phone: userInfo.phone,
      });
    }

    // Create subscription record
    const subscription = await Subscription.create({
      userId: user._id,
      planId: planId,
      paymentIntentId: paymentIntentId,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency.toUpperCase(),
      status: "active",
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      paymentMethod: paymentIntent.payment_method,
    });

    // Update user with plan
    user.activePlan = planId;
    user.subscription = subscription._id;
    await user.save();

    res.json({
      success: true,
      message: "Subscription created successfully",
      subscription: subscription,
      user: {
        id: user._id,
        email: user.email,
        activePlan: user.activePlan,
      },
    });
  } catch (error) {
    console.error("Payment confirmation error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get user subscription status
exports.getSubscription = async (req, res) => {
  try {
    const { userId } = req.params;

    const subscription = await Subscription.findOne({ userId: userId });

    if (!subscription) {
      return res.status(404).json({ message: "No active subscription found" });
    }

    res.json({
      subscription: subscription,
      isActive: subscription.status === "active",
      daysRemaining: Math.ceil(
        (subscription.endDate - Date.now()) / (24 * 60 * 60 * 1000),
      ),
    });
  } catch (error) {
    console.error("Get subscription error:", error);
    res.status(500).json({ error: error.message });
  }
};
