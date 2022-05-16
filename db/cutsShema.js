const Joi = require('joi');

const cutsShema = Joi.object({
  cut: Joi.string().required(),
  size_and_fit: Joi.array().items(Joi.string().allow(null)),
});

module.exports = cutsShema;
