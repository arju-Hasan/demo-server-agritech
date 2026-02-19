const Transaction = require("../models/transaction.model");
const Order = require("../models/order.model");

// Create Transaction
exports.createTransaction = async (req, res) => {
  try {
    const { orderId, category, amount, paymentMethod, status, incomeExpense, description } = req.body;

    // Validate
    if (!category || !amount) {
      return res.status(400).json({
        success: false,
        message: "Category and amount are required",
      });
    }

    // Generate transaction ID
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create transaction
    const transaction = await Transaction.create({
      transactionId,
      orderId,
      userId: req.user.id,
      category,
      amount,
      paymentMethod,
      status,
      incomeExpense,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Transactions
exports.getTransactions = async (req, res) => {
  try {
    const { status, category, page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    let filter = { userId: req.user.id };

    if (status) filter.status = status;
    if (category) filter.category = category;

    const transactions = await Transaction.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalTransactions = await Transaction.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        transactions,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalTransactions / limit),
          totalTransactions,
          limit: parseInt(limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Financial Dashboard
exports.getFinancialDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get totals
    const incomeTransactions = await Transaction.find({
      userId,
      incomeExpense: "income",
      status: "completed",
    });

    const expenseTransactions = await Transaction.find({
      userId,
      incomeExpense: "expense",
      status: "completed",
    });

    const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
    const netProfit = totalIncome - totalExpense;

    // Get transaction count by category
    const byCategory = await Transaction.aggregate([
      { $match: { userId: require("mongoose").Types.ObjectId(userId) } },
      { $group: { _id: "$category", count: { $sum: 1 }, total: { $sum: "$amount" } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalIncome,
          totalExpense,
          netProfit,
          totalTransactions: incomeTransactions.length + expenseTransactions.length,
        },
        byCategory,
        incomeTransactions,
        expenseTransactions,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // Check authorization
    if (transaction.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this transaction",
      });
    }

    await Transaction.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
