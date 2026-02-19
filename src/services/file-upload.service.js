const cloudinary = require("cloudinary").v2;
const logger = require("../utils/logger.util");

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file to Cloudinary
const uploadToCloudinary = async (file, folder = "farming-platform") => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }
    
    // For Express multer file
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: "auto",
        quality: "auto",
      },
      (error, result) => {
        if (error) {
          logger.error("Cloudinary upload error:", error);
          throw error;
        }
        return result;
      }
    );
    
    uploadStream.end(file.buffer);
    
    return new Promise((resolve, reject) => {
      uploadStream.on("finish", () => {
        resolve(uploadStream.result);
      });
      uploadStream.on("error", (error) => {
        reject(error);
      });
    });
  } catch (error) {
    logger.error("Error uploading file to Cloudinary:", error);
    throw error;
  }
};

// Upload base64 to Cloudinary
const uploadBase64ToCloudinary = async (base64String, folder = "farming-platform", filename = "image") => {
  try {
    const result = await cloudinary.uploader.upload(base64String, {
      folder: folder,
      public_id: filename,
      resource_type: "auto",
      quality: "auto",
    });
    
    logger.info(`File uploaded successfully: ${result.public_id}`);
    return result;
  } catch (error) {
    logger.error("Error uploading base64 to Cloudinary:", error);
    throw error;
  }
};

// Delete file from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    
    logger.info(`File deleted successfully: ${publicId}`);
    return result;
  } catch (error) {
    logger.error("Error deleting file from Cloudinary:", error);
    throw error;
  }
};

// Get file URL
const getFileUrl = (publicId, options = {}) => {
  try {
    return cloudinary.url(publicId, {
      quality: "auto",
      fetch_format: "auto",
      ...options,
    });
  } catch (error) {
    logger.error("Error getting file URL:", error);
    throw error;
  }
};

// Upload multiple files
const uploadMultipleToCloudinary = async (files, folder = "farming-platform") => {
  try {
    const uploadPromises = files.map((file) =>
      uploadToCloudinary(file, folder)
    );
    
    const results = await Promise.all(uploadPromises);
    
    logger.info(`${results.length} files uploaded successfully`);
    return results;
  } catch (error) {
    logger.error("Error uploading multiple files:", error);
    throw error;
  }
};

module.exports = {
  uploadToCloudinary,
  uploadBase64ToCloudinary,
  deleteFromCloudinary,
  getFileUrl,
  uploadMultipleToCloudinary,
  cloudinary,
};
