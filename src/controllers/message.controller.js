const { Message, Conversation } = require("../models/message.model");

// Get Conversations
exports.getConversations = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const conversations = await Conversation.find({
      participants: req.user.id,
    })
      .populate("participants", "profile.firstName profile.lastName profile.avatar username")
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalConversations = await Conversation.countDocuments({
      participants: req.user.id,
    });

    res.status(200).json({
      success: true,
      data: {
        conversations,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalConversations / limit),
          totalConversations,
          limit: parseInt(limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Messages
exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    const skip = (page - 1) * limit;

    // Check if user is part of conversation
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    if (!conversation.participants.includes(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: "You don't have access to this conversation",
      });
    }

    const messages = await Message.find({ conversationId })
      .populate("senderId", "profile.firstName profile.lastName profile.avatar username")
      .populate("replyTo")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalMessages = await Message.countDocuments({ conversationId });

    res.status(200).json({
      success: true,
      data: {
        messages: messages.reverse(),
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalMessages / limit),
          totalMessages,
          limit: parseInt(limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Send Message
exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, message, conversationId: givenConversationId } = req.body;

    if (!receiverId || !message) {
      return res.status(400).json({
        success: false,
        message: "Receiver ID and message are required",
      });
    }

    let conversation;

    if (givenConversationId) {
      conversation = await Conversation.findById(givenConversationId);

      if (!conversation) {
        return res.status(404).json({
          success: false,
          message: "Conversation not found",
        });
      }
    } else {
      // Find or create conversation
      conversation = await Conversation.findOne({
        participants: { $all: [req.user.id, receiverId] },
      });

      if (!conversation) {
        conversation = await Conversation.create({
          participants: [req.user.id, receiverId],
        });
      }
    }

    // Create message
    const newMessage = await Message.create({
      conversationId: conversation._id,
      senderId: req.user.id,
      receiverId,
      message,
    });

    // Update conversation
    await Conversation.findByIdAndUpdate(
      conversation._id,
      {
        lastMessage: message,
        lastMessageTime: new Date(),
      },
      { new: true }
    );

    await newMessage.populate("senderId", "profile.firstName profile.lastName profile.avatar username");

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark Message as Read
exports.markAsRead = async (req, res) => {
  try {
    const { conversationId } = req.params;

    // Mark all messages from other participants as read
    await Message.updateMany(
      {
        conversationId,
        receiverId: req.user.id,
        isRead: false,
      },
      {
        isRead: true,
        readAt: new Date(),
      }
    );

    res.status(200).json({
      success: true,
      message: "Messages marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Message
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // Check if user is the sender
    if (message.senderId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own messages",
      });
    }

    await Message.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
