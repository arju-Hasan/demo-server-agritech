const Joi = require("joi");

const createOrderSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().positive().required(),
      })
    )
    .required(),
  shippingAddress: Joi.object({
    fullName: Joi.string().required(),
    phone: Joi.string().required(),
    division: Joi.string().required(),
    district: Joi.string().required(),
    upazila: Joi.string(),
    village: Joi.string(),
    address: Joi.string().required(),
    zipCode: Joi.string(),
  }).required(),
  paymentMethod: Joi.string()
    .valid("card", "mobile_banking", "bank_transfer", "cash_on_delivery")
    .required(),
  notes: Joi.string(),
});

const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "confirmed", "processing", "shipped", "delivered", "cancelled")
    .required(),
  notes: Joi.string(),
});

const cancelOrderSchema = Joi.object({
  reason: Joi.string(),
});

module.exports = {
  createOrderSchema,
  updateOrderStatusSchema,
  cancelOrderSchema,
};
