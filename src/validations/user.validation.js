const Joi = require("joi");

const updateProfileSchema = Joi.object({
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
    avatar: Joi.string().uri(),
  }),
  farmerData: Joi.object({
    farmSize: Joi.number(),
    farmingExperience: Joi.number(),
    crops: Joi.array().items(Joi.string()),
  }),
  sellerData: Joi.object({
    businessName: Joi.string(),
    businessType: Joi.string().valid("seeds", "fertilizers", "tools", "equipment"),
    tradeLicense: Joi.string(),
    verified: Joi.boolean(),
  }),
});

module.exports = {
  updateProfileSchema,
};
