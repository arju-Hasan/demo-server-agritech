const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Get user profile
router.get("/me", userController.getProfile);

// Update user profile
router.put("/me", userController.updateProfile);

// Admin only routes
router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserById);
router.patch("/:userId/status", userController.updateUserStatus);

module.exports = router;
