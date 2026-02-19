const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");

// Notification routes
router.get("/", notificationController.getNotifications);
router.get("/unread-count", notificationController.getUnreadCount);
router.patch("/:id/read", notificationController.markAsRead);
router.patch("/all/mark-as-read", notificationController.markAllAsRead);

module.exports = router;
