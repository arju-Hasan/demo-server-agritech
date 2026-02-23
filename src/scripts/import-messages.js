const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../../.env") });

// Import models
const { Message, Conversation } = require("../models/message.model");

async function importData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Read sample data
    const conversationsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../../sample-data/conversations.json"))
    );
    const messagesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../../sample-data/messages.json"))
    );

    // Clear existing data
    await Conversation.deleteMany({});
    await Message.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Insert conversations
    await Conversation.insertMany(conversationsData);
    console.log(`✅ Inserted ${conversationsData.length} conversations`);

    // Insert messages
    await Message.insertMany(messagesData);
    console.log(`✅ Inserted ${messagesData.length} messages`);

    console.log("\n✨ Data import completed successfully!");
    console.log("\nYou can now:");
    console.log("  GET  /messages/conversations - Get all conversations");
    console.log("  GET  /messages/:conversationId - Get messages from conversation");
    console.log("  POST /messages - Send a new message");

    process.exit(0);
  } catch (error) {
    console.error("❌ Import failed:", error.message);
    process.exit(1);
  }
}

importData();
