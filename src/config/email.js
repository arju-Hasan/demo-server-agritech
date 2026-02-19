const nodemailer = require("nodemailer");
const logger = require("../utils/logger.util");

// Create email transporter
const createEmailTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT == 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  
  return transporter;
};

// Verify email configuration
const verifyEmailConfig = () => {
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    logger.warn("Email service not fully configured");
    return false;
  }
  
  try {
    const transporter = createEmailTransporter();
    transporter.verify((error, success) => {
      if (error) {
        logger.error("Email service verification failed:", error);
        return false;
      }
      logger.info("Email service configured successfully");
      return true;
    });
  } catch (error) {
    logger.error("Error configuring email service:", error);
    return false;
  }
};

// Email templates
const emailTemplates = {
  verificationEmail: (firstName, verificationLink) => ({
    subject: "Email Verification - Smart Farming Platform",
    html: `
      <h2>Welcome to Smart Farming Platform!</h2>
      <p>Hi ${firstName || "User"},</p>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${verificationLink}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; display: inline-block;">
        Verify Email
      </a>
      <p>This link will expire in 24 hours.</p>
      <p>If you did not create this account, please ignore this email.</p>
      <br>
      <p>Best regards,<br>Smart Farming Team</p>
    `,
  }),
};

module.exports = {
  createEmailTransporter,
  verifyEmailConfig,
  emailTemplates,
};
