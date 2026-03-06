const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

// Reset Password
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: "Token and password required",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updateResult = await User.findByIdAndUpdate(
      user._id,
      {
        password: hashedPassword,
        passwordResetToken: undefined,
        passwordResetExpires: undefined,
      },
      { new: true }
    );

    if (!updateResult) {
      return res.status(500).json({
        success: false,
        message: "Update failed, please try again",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password updated successfully!",
    });
  })
);

module.exports = router;
