const Joi = require('joi');

const fabricShema = Joi.object({
  name: Joi.string().required(),
  stretch: Joi.boolean().default(false),
  anti_billing: Joi.boolean().default(false),
  buttery_soft: Joi.boolean().default(false),
  pre_shrunk: Joi.boolean().default(false),
  wrinkle_free: Joi.boolean().default(false),
  color_and_fit_retention: Joi.boolean().default(false),
  breathable: Joi.boolean().default(false),
  durable: Joi.boolean().default(false),
  lightweight: Joi.boolean().default(false),
  natural_softness: Joi.boolean().default(false),
});

module.exports = fabricShema;
