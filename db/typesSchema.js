const Joi = require('joi');

const typesShema = Joi.object({
  type: Joi.string().required(),
  summary: Joi.string().required(),
});

module.exports = typesShema;
