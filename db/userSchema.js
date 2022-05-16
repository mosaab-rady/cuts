const Joi = require('joi');

const userShema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  role: Joi.string().valid('admin', 'user').default('user'),
});

module.exports = userShema;
