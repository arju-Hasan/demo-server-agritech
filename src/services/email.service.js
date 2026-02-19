const nodemailer = require("nodemailer");
const logger = require("../utils/logger.util");

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    logger.error("Email service error:", error);
  } else {
    logger.info("Email service is ready");
  }
});

// Send verification email
const sendVerificationEmail = async (email, firstName, verificationLink) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || "noreply@farming.com",
      to: email,
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
    };
    
    await transporter.sendMail(mailOptions);
    logger.info(`Verification email sent to ${email}`);
    return true;
  } catch (error) {
    logger.error("Error sending verification email:", error);
    throw error;
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, firstName, resetLink) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || "noreply@farming.com",
      to: email,
      subject: "Password Reset - Smart Farming Platform",
      html: `
        <h2>Password Reset Request</h2>
        <p>Hi ${firstName || "User"},</p>
        <p>We received a request to reset your password. Click the link below to proceed:</p>
        <a href="${resetLink}" style="padding: 10px 20px; background-color: #2196F3; color: white; text-decoration: none; border-radius: 5px; display: inline-block;">
          Reset Password
        </a>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <br>
        <p>Best regards,<br>Smart Farming Team</p>
      `,
    };
    
    await transporter.sendMail(mailOptions);
    logger.info(`Password reset email sent to ${email}`);
    return true;
  } catch (error) {
    logger.error("Error sending password reset email:", error);
    throw error;
  }
};

// Send order confirmation email
const sendOrderConfirmationEmail = async (email, firstName, orderDetails) => {
  try {
    const { orderId, items, totalAmount, estimatedDelivery } = orderDetails;
    
    const itemsHTML = items.map(item => `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.price}</td>
        <td>${item.subtotal}</td>
      </tr>
    `).join("");
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || "noreply@farming.com",
      to: email,
      subject: `Order Confirmation #${orderId} - Smart Farming Platform`,
      html: `
        <h2>Order Confirmed!</h2>
        <p>Hi ${firstName || "User"},</p>
        <p>Thank you for your order. Here are the details:</p>
        
        <h3>Order ID: ${orderId}</h3>
        
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f0f0f0;">
              <th style="border: 1px solid #ddd; padding: 8px;">Product</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>
        
        <h3>Total Amount: ${totalAmount}</h3>
        <p>Estimated Delivery: ${estimatedDelivery}</p>
        
        <p>You can track your order status in your account dashboard.</p>
        <br>
        <p>Best regards,<br>Smart Farming Team</p>
      `,
    };
    
    await transporter.sendMail(mailOptions);
    logger.info(`Order confirmation email sent to ${email}`);
    return true;
  } catch (error) {
    logger.error("Error sending order confirmation email:", error);
    throw error;
  }
};

// Send welcome email
const sendWelcomeEmail = async (email, firstName) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || "noreply@farming.com",
      to: email,
      subject: "Welcome to Smart Farming Platform",
      html: `
        <h2>Welcome to Smart Farming Platform!</h2>
        <p>Hi ${firstName || "User"},</p>
        <p>We're excited to have you on board.</p>
        <p>With our platform, you can:</p>
        <ul>
          <li>Get personalized crop recommendations</li>
          <li>Monitor your crops in real-time</li>
          <li>Access market prices and predictions</li>
          <li>Connect with other farmers</li>
          <li>Buy and sell quality products</li>
        </ul>
        <p>Start exploring now!</p>
        <br>
        <p>Best regards,<br>Smart Farming Team</p>
      `,
    };
    
    await transporter.sendMail(mailOptions);
    logger.info(`Welcome email sent to ${email}`);
    return true;
  } catch (error) {
    logger.error("Error sending welcome email:", error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendOrderConfirmationEmail,
  sendWelcomeEmail,
};
