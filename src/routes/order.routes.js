const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

// Customer routes
router.post("/", orderController.createOrder);
router.get("/", orderController.getOrders);
router.get("/:id", orderController.getOrderById);
router.patch("/:id/cancel", orderController.cancelOrder);

// Seller routes
router.get("/seller/orders", orderController.getSellerOrders);

// Admin only
router.patch("/:id/status", orderController.updateOrderStatus);

module.exports = router;
