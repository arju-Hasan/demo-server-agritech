const express = require("express");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

// Forgot Password
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });

    // Always respond the same to prevent email enumeration
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If this email exists, a reset link has been sent.",
      });
    }

    console.log("User found for password reset:", user.email);

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    console.log("Generated reset token (plain):", resetToken);

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Token expiry 15 minutes
    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
    console.log("Hashed reset token:", hashedToken);

    // Save hashed token & expiry in DB
    await User.findByIdAndUpdate(user._id, {
      passwordResetToken: hashedToken,
      passwordResetExpires: resetTokenExpiry,
    });

    // Reset password link (frontend route)
    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset-password/${resetToken}`;

    // Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    try {
      await transporter.sendMail({
        from: `"Agritech Support" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Password Reset Request",
        html: `<h2>Password Reset</h2><p>Click the link below to reset your password. This link is valid for 15 minutes.</p><a href="${resetUrl}">${resetUrl}</a>`,
      });
      console.log("Email sent successfully to:", email);
    } catch (emailError) {
      console.error("Email sending error:", emailError.message);
      // Still return success to prevent email enumeration
      // In production, you might want to log this for monitoring
    }

    return res.status(200).json({
      success: true,
      message: "If this email exists, a reset link has been sent.",
      // For testing only - remove in production
      testToken: process.env.NODE_ENV === "development" ? resetToken : undefined,
    });
  })
);

module.exports = router;
