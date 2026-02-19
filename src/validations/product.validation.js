const Joi = require("joi");

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string()
    .valid("seeds", "fertilizers", "tools", "equipment", "pesticides", "other")
    .required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().min(0).default(0),
  image: Joi.string().uri(),
  images: Joi.array().items(Joi.string().uri()),
  specifications: Joi.object(),
  sku: Joi.string(),
  brand: Joi.string(),
  discount: Joi.number().min(0).max(100),
});

const updateProductSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  category: Joi.string().valid("seeds", "fertilizers", "tools", "equipment", "pesticides", "other"),
  price: Joi.number().positive(),
  stock: Joi.number().min(0),
  image: Joi.string().uri(),
  images: Joi.array().items(Joi.string().uri()),
  specifications: Joi.object(),
  isActive: Joi.boolean(),
  discount: Joi.number().min(0).max(100),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
};
