const logger = require("./logger.util");

// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation (Bangladesh format)
const isValidPhone = (phone) => {
  // Accept Bangladesh phone numbers
  const phoneRegex = /^(\+880|0)?(1[3-9]\d{8})$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

// Password validation
const isValidPassword = (password) => {
  // Minimum 6 characters
  return password && password.length >= 6;
};

// URL validation
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

// Sanitize input - Remove harmful characters
const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;
  
  return input
    .trim()
    .replace(/[<>\"']/g, "") // Remove HTML special chars
    .slice(0, 1000); // Limit length
};

// Validate MongoDB ObjectId
const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

// Validate number
const isValidNumber = (num, min = null, max = null) => {
  if (isNaN(num)) return false;
  
  const number = parseFloat(num);
  
  if (min !== null && number < min) return false;
  if (max !== null && number > max) return false;
  
  return true;
};

// Validate enum value
const isValidEnumValue = (value, enumArray) => {
  return enumArray.includes(value);
};

// Validate required fields
const validateRequiredFields = (obj, requiredFields) => {
  const missingFields = [];
  
  for (const field of requiredFields) {
    if (!obj[field] || (typeof obj[field] === "string" && obj[field].trim() === "")) {
      missingFields.push(field);
    }
  }
  
  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};

// Clean object - remove undefined and null values
const cleanObject = (obj) => {
  const cleaned = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null && value !== "") {
      cleaned[key] = value;
    }
  }
  
  return cleaned;
};

module.exports = {
  isValidEmail,
  isValidPhone,
  isValidPassword,
  isValidUrl,
  sanitizeInput,
  isValidObjectId,
  isValidNumber,
  isValidEnumValue,
  validateRequiredFields,
  cleanObject,
};
