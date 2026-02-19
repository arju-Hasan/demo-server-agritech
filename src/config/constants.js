// Application Constants

// User Roles
const USER_ROLES = {
  ADMIN: "admin",
  MANAGEMENT: "management",
  FARMER: "farmer",
  SELLER: "seller",
};

// User Status
const USER_STATUS = {
  ACTIVE: "active",
  BLOCKED: "blocked",
  PENDING: "pending",
};

// Crop Categories
const CROP_CATEGORIES = {
  CEREAL: "cereal",
  VEGETABLE: "vegetable",
  FRUIT: "fruit",
  PULSE: "pulse",
  OILSEED: "oilseed",
  SPICE: "spice",
  CASH_CROP: "cash crop",
};

// Crop Seasons
const CROP_SEASONS = {
  KHARIF: "kharif",
  RABI: "rabi",
  ZAID: "zaid",
  ALL_SEASON: "all-season",
};

// Order Status
const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  RETURNED: "returned",
};

// Transaction Types
const TRANSACTION_TYPES = {
  INCOME: "income",
  EXPENSE: "expense",
};

// Blog Post Categories
const BLOG_CATEGORIES = {
  FARMING_TIPS: "farming-tips",
  CROP_GUIDE: "crop-guide",
  PEST_MANAGEMENT: "pest-management",
  SOIL_HEALTH: "soil-health",
  WEATHER: "weather",
  MARKET_INSIGHTS: "market-insights",
  SUCCESS_STORY: "success-story",
  TECHNOLOGY: "technology",
};

// Forum Post Categories
const FORUM_CATEGORIES = {
  CROP_ADVICE: "crop-advice",
  PEST_DISEASE: "pest-disease",
  SOIL_FERTILIZER: "soil-fertilizer",
  IRRIGATION: "irrigation",
  MACHINERY: "machinery",
  MARKET: "market",
  WEATHER: "weather",
  GENERAL: "general",
};

// Forum Post Status
const FORUM_POST_STATUS = {
  OPEN: "open",
  CLOSED: "closed",
  SOLVED: "solved",
};

// Health Status
const HEALTH_STATUS = {
  EXCELLENT: "excellent",
  GOOD: "good",
  MODERATE: "moderate",
  POOR: "poor",
};

// Risk Levels
const RISK_LEVELS = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

// Pagination
const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
};

// JWT
const JWT_CONFIG = {
  ALGORITHM: "HS256",
  ACCESS_TOKEN_EXPIRY: process.env.JWT_EXPIRE || "7d",
  REFRESH_TOKEN_EXPIRY: process.env.JWT_REFRESH_EXPIRE || "30d",
};

// File Upload
const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_MIMES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  UPLOAD_FOLDER: "farming-platform",
};

// API Endpoints
const API_ENDPOINTS = {
  AUTH: "/auth",
  USERS: "/users",
  CROPS: "/crops",
  SOIL: "/soil",
  PRODUCTS: "/products",
  ORDERS: "/orders",
  BLOG: "/blog",
  FORUM: "/forum",
  WEATHER: "/weather",
};

// Error Messages
const ERROR_MESSAGES = {
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Access forbidden",
  NOT_FOUND: "Resource not found",
  INVALID_INPUT: "Invalid input data",
  SERVER_ERROR: "Internal server error",
  DUPLICATE_ENTRY: "Duplicate entry",
  OPERATION_FAILED: "Operation failed",
};

// Success Messages
const SUCCESS_MESSAGES = {
  CREATED: "Created successfully",
  UPDATED: "Updated successfully",
  DELETED: "Deleted successfully",
  OPERATION_SUCCESS: "Operation completed successfully",
};

module.exports = {
  USER_ROLES,
  USER_STATUS,
  CROP_CATEGORIES,
  CROP_SEASONS,
  ORDER_STATUS,
  TRANSACTION_TYPES,
  BLOG_CATEGORIES,
  FORUM_CATEGORIES,
  FORUM_POST_STATUS,
  HEALTH_STATUS,
  RISK_LEVELS,
  PAGINATION,
  JWT_CONFIG,
  FILE_UPLOAD,
  API_ENDPOINTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
