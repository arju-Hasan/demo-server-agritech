const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

// Public routes
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// Seller routes (requires authentication)
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.patch("/:id/stock", productController.updateStock);
router.get("/seller/products", productController.getSellerProducts);

module.exports = router;
