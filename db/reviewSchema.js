const Joi = require('joi');

const reviewSchema = Joi.object({
  product: Joi.string().uuid().required(),
  user_id: Joi.string().uuid().required(),
  review: Joi.string().required(),
  title: Joi.string().max(150).required(),
  score: Joi.number().max(5).min(1).required(),
  fit: Joi.string()
    .valid('small', 'trim', 'perfect', 'loose', 'large')
    .allow(null),
  bodytype: Joi.string()
    .valid('slim', 'athletic', 'muscular', 'curvy')
    .allow(null),
  size: Joi.string().valid('s', 'm', 'l', 'xl', 'xxl').allow(null),
  tall: Joi.string().valid(
    '<5ft 10in',
    '5ft 10in - 6ft 0in',
    '6ft 1in - 6ft 3in',
    '>6ft 3in'
  ),
});

module.exports = reviewSchema;
