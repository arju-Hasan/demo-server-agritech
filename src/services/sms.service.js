const logger = require("../utils/logger.util");

// SMS service using Twilio
// Install: npm install twilio
// Configure Twilio credentials in .env

let twilio;
try {
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    twilio = require("twilio")(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }
} catch (error) {
  logger.warn("Twilio not configured, SMS service unavailable");
}

// Send OTP via SMS
const sendOTP = async (phoneNumber, otp, expiryMinutes = 10) => {
  try {
    if (!twilio) {
      logger.warn("SMS service not configured");
      return false;
    }
    
    const message = await twilio.messages.create({
      body: `Your Smart Farming Platform OTP is: ${otp}. This will expire in ${expiryMinutes} minutes. Do not share this with anyone.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    
    logger.info(`OTP sent to ${phoneNumber}. Message ID: ${message.sid}`);
    return true;
  } catch (error) {
    logger.error("Error sending OTP:", error);
    throw error;
  }
};

// Send notification SMS
const sendNotificationSMS = async (phoneNumber, message) => {
  try {
    if (!twilio) {
      logger.warn("SMS service not configured");
      return false;
    }
    
    const sms = await twilio.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    
    logger.info(`Notification SMS sent to ${phoneNumber}. Message ID: ${sms.sid}`);
    return true;
  } catch (error) {
    logger.error("Error sending notification SMS:", error);
    throw error;
  }
};

// Send order status update via SMS
const sendOrderUpdateSMS = async (phoneNumber, orderId, status) => {
  try {
    if (!twilio) {
      logger.warn("SMS service not configured");
      return false;
    }
    
    const message = `Your order #${orderId} status: ${status}. Visit your account for details.`;
    
    const sms = await twilio.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    
    logger.info(`Order update SMS sent to ${phoneNumber}. Message ID: ${sms.sid}`);
    return true;
  } catch (error) {
    logger.error("Error sending order update SMS:", error);
    throw error;
  }
};

module.exports = {
  sendOTP,
  sendNotificationSMS,
  sendOrderUpdateSMS,
};
