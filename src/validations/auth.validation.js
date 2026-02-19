const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("farmer", "seller", "admin", "management").default("farmer"),
  profile: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    phone: Joi.string(),
    address: Joi.object({
      division: Joi.string(),
      district: Joi.string(),
      upazila: Joi.string(),
      village: Joi.string(),
    }),
  }),
  farmerData: Joi.when("role", {
    is: "farmer",
    then: Joi.object({
      farmSize: Joi.number(),
      farmingExperience: Joi.number(),
      crops: Joi.array().items(Joi.string()),
    }),
  }),
  sellerData: Joi.when("role", {
    is: "seller",
    then: Joi.object({
      businessName: Joi.string(),
      businessType: Joi.string().valid("seeds", "fertilizers", "tools", "equipment"),
      tradeLicense: Joi.string(),
    }),
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
