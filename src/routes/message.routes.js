const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");

// Message routes
router.get("/conversations", messageController.getConversations);
router.get("/:conversationId", messageController.getMessages);
router.post("/", messageController.sendMessage);
router.patch("/:conversationId/read", messageController.markAsRead);
router.delete("/:id", messageController.deleteMessage);

module.exports = router;
