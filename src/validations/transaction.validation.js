const Joi = require("joi");

const createTransactionSchema = Joi.object({
  orderId: Joi.string(),
  category: Joi.string()
    .valid("product_sale", "service_charge", "refund", "adjustment")
    .required(),
  amount: Joi.number().positive().required(),
  paymentMethod: Joi.string().valid("card", "mobile_banking", "bank_transfer", "cash_on_delivery", "wallet"),
  status: Joi.string().valid("pending", "completed", "failed", "cancelled"),
  incomeExpense: Joi.string().valid("income", "expense").required(),
  description: Joi.string(),
});

module.exports = {
  createTransactionSchema,
};
