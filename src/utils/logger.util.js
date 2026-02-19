const fs = require("fs");
const path = require("path");

// Log levels
const LOG_LEVELS = {
  ERROR: "ERROR",
  WARN: "WARN",
  INFO: "INFO",
  DEBUG: "DEBUG",
};

// Get log level from environment
const LOG_LEVEL = process.env.LOG_LEVEL || "INFO";

// Logger object
const logger = {
  // Error logging
  error: (message, error = null) => {
    const logMessage = `[${new Date().toISOString()}] [ERROR] ${message}${error ? "\n" + error.stack : ""}`;
    console.error(logMessage);
    writeToFile(logMessage);
  },
  
  // Warning logging
  warn: (message) => {
    if (shouldLog("WARN")) {
      const logMessage = `[${new Date().toISOString()}] [WARN] ${message}`;
      console.warn(logMessage);
      writeToFile(logMessage);
    }
  },
  
  // Info logging
  info: (message) => {
    if (shouldLog("INFO")) {
      const logMessage = `[${new Date().toISOString()}] [INFO] ${message}`;
      console.log(logMessage);
      writeToFile(logMessage);
    }
  },
  
  // Debug logging
  debug: (message) => {
    if (shouldLog("DEBUG")) {
      const logMessage = `[${new Date().toISOString()}] [DEBUG] ${message}`;
      console.log(logMessage);
    }
  },
};

// Check if log level should be logged
const shouldLog = (level) => {
  const levels = Object.keys(LOG_LEVELS);
  return levels.indexOf(level) <= levels.indexOf(LOG_LEVEL);
};

// Write log to file
const writeToFile = (message) => {
  try {
    const logsDir = path.join(__dirname, "../../logs");
    
    // Create logs directory if it doesn't exist
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    
    const logFile = path.join(logsDir, `${new Date().toISOString().split("T")[0]}.log`);
    
    fs.appendFileSync(logFile, message + "\n");
  } catch (error) {
    console.error("Error writing to log file:", error);
  }
};

module.exports = logger;
