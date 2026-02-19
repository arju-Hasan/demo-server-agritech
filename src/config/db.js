const mongoose = require("mongoose");
const dns = require('dns');

// Allow overriding DNS servers via env `DNS_SERVERS` (comma-separated).
// This helps when the system's resolver (VPN/WARP) blocks SRV lookups from Node.
if (process.env.DNS_SERVERS) {
  try {
    const servers = process.env.DNS_SERVERS.split(",").map(s => s.trim()).filter(Boolean);
    if (servers.length) dns.setServers(servers);
  } catch (err) {
    // ignore
  }
} else {
  // Set common public resolvers as a fallback for Node's c-ares resolver
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
}

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI is not set in environment variables.");
    throw new Error("MONGO_URI is not configured");
  }

  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      // Connection options for production/serverless environments
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 15000, // 15 seconds for Vercel
        socketTimeoutMS: 45000, // Socket timeout
        connectTimeoutMS: 15000,
        retryWrites: true,
        w: "majority",
        family: 4, // Use IPv4, skip IPv6 issues
        maxPoolSize: 10,
        minPoolSize: 5,
      });
      console.log("✅ MongoDB connected successfully");
      return;
    } catch (error) {
      retries++;
      console.error(
        `MongoDB connection error (Attempt ${retries}/${maxRetries}):`,
        error.message
      );

      if (retries >= maxRetries) {
        console.error("❌ Failed to connect to MongoDB after retries");
        throw error;
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
};

module.exports = connectDB;
