const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");
const { authenticate } = require("../middlewares/auth.middleware");

// Message routes - All protected with authentication
router.get("/conversations", authenticate, messageController.getConversations);
router.get("/:conversationId", authenticate, messageController.getMessages);
router.post("/", authenticate, messageController.sendMessage);
router.patch("/:conversationId/read", authenticate, messageController.markAsRead);
router.delete("/:id", authenticate, messageController.deleteMessage);

module.exports = router;


