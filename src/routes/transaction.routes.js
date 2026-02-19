const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction.controller");

// Transaction routes
router.post("/", transactionController.createTransaction);
router.get("/", transactionController.getTransactions);
router.get("/dashboard/financial", transactionController.getFinancialDashboard);
router.delete("/:id", transactionController.deleteTransaction);

module.exports = router;
