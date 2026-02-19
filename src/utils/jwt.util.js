const jwt = require("jsonwebtoken");
const logger = require("./logger.util");

// Generate Access Token
const generateAccessToken = (userId, expiresIn = process.env.JWT_EXPIRE || "7d") => {
  try {
    const token = jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      { expiresIn }
    );
    
    logger.debug(`Access token generated for user: ${userId}`);
    return token;
  } catch (error) {
    logger.error("Error generating access token:", error);
    throw error;
  }
};

// Generate Refresh Token
const generateRefreshToken = (userId, expiresIn = process.env.JWT_REFRESH_EXPIRE || "30d") => {
  try {
    const token = jwt.sign(
      { id: userId },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn }
    );
    
    logger.debug(`Refresh token generated for user: ${userId}`);
    return token;
  } catch (error) {
    logger.error("Error generating refresh token:", error);
    throw error;
  }
};

// Verify Access Token
const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      logger.warn("Access token expired");
      throw new Error("Token expired");
    }
    logger.error("Error verifying access token:", error);
    throw new Error("Invalid token");
  }
};

// Verify Refresh Token
const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      logger.warn("Refresh token expired");
      throw new Error("Refresh token expired");
    }
    logger.error("Error verifying refresh token:", error);
    throw new Error("Invalid refresh token");
  }
};

// Decode token without verification (for debugging)
const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    logger.error("Error decoding token:", error);
    return null;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
};
