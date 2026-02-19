const bcrypt = require("bcryptjs");
const logger = require("./logger.util");

// Hash password
const hashPassword = async (password, saltRounds = 10) => {
  try {
    if (!password || password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    logger.debug("Password hashed successfully");
    return hashedPassword;
  } catch (error) {
    logger.error("Error hashing password:", error);
    throw error;
  }
};

// Compare password with hash
const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    logger.error("Error comparing passwords:", error);
    throw error;
  }
};

// Check password strength
const checkPasswordStrength = (password) => {
  const strength = {
    score: 0,
    feedback: [],
  };
  
  if (!password) {
    return { score: 0, feedback: ["Password is required"] };
  }
  
  // Length check
  if (password.length >= 8) strength.score += 1;
  else strength.feedback.push("Use at least 8 characters");
  
  // Uppercase check
  if (/[A-Z]/.test(password)) strength.score += 1;
  else strength.feedback.push("Add uppercase letters");
  
  // Lowercase check
  if (/[a-z]/.test(password)) strength.score += 1;
  else strength.feedback.push("Add lowercase letters");
  
  // Number check
  if (/\d/.test(password)) strength.score += 1;
  else strength.feedback.push("Add numbers");
  
  // Special character check
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength.score += 1;
  else strength.feedback.push("Add special characters");
  
  return strength;
};

module.exports = {
  hashPassword,
  comparePassword,
  checkPasswordStrength,
};
