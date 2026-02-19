const cloudinary = require("cloudinary").v2;
const logger = require("../utils/logger.util");

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Verify configuration
const verifyCloudinaryConfig = () => {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    logger.warn("Cloudinary credentials not fully configured");
    return false;
  }
  
  logger.info("Cloudinary configured successfully");
  return true;
};

module.exports = {
  cloudinary,
  verifyCloudinaryConfig,
};
