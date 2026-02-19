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
    return;
  }

  try {
    // Modern mongoose (v6+) and mongodb drivers handle parsing internally.
    // Connect without deprecated options.
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // Exit the process - prevents server from running without DB
    process.exit(1);
  }
};

module.exports = connectDB;
