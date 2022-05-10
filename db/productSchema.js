const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(10).max(50).required(),
  type: Joi.string()
    .valid('t-shirt', 'polo', 'long-sleeve', 'sweat-shirt', 'hooded-shirt')
    .required(),
  fabric: Joi.string().min(1).max(50).required(),
  collection_name: Joi.string().allow(''),
  size_and_fit: Joi.array().items(Joi.string()).allow(''),
  material_and_care: Joi.array().items(Joi.string()).allow(''),
  reason: Joi.string().allow(''),
  price: Joi.number().required(),
  summary: Joi.string().required(),
  cut: Joi.string().required().valid('classic', 'elongated', 'split'),
  collar: Joi.string()
    .required()
    .valid('crew', 'hoodie', 'henley', 'hooded', 'v-neck', 'polo'),
  color: Joi.string().required().max(20),
  color_hex: Joi.string().required().max(20),
  small_size: Joi.number().required().integer(),
  medium_size: Joi.number().required().integer(),
  large_size: Joi.number().required().integer(),
  x_large_size: Joi.number().required().integer(),
  xx_large_size: Joi.number().required().integer(),
  image_cover: Joi.string().required(),
  image_detail: Joi.string().required(),
  images: Joi.array().items(Joi.string()),
  ratings_quantity: Joi.number().default(0),
  ratings_average: Joi.number().default(4.5),
  slug: Joi.string().max(50).allow(''),
  created_at: Joi.date(),
});

module.exports = productSchema;
