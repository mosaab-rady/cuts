const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(10).max(50).required(),
  type: Joi.string()
    .valid('t-shirt', 'polo', 'long-sleeve', 'sweat-shirt', 'hooded-shirt')
    .required(),
  fabric: Joi.string().min(1).max(50).required(),
  collectionId: Joi.number(),
  sizeAndFit: Joi.array().items(Joi.string()),
  materialAndCare: Joi.array().items(Joi.string()),
  reason: Joi.string(),
  price: Joi.number().required(),
  summary: Joi.string().required(),
  cut: Joi.string().required().valid('classic', 'elongated', 'split'),
  collar: Joi.string()
    .required()
    .valid('crew', 'hoodie', 'henley', 'hooded', 'v-neck', 'polo'),
  color: Joi.string().required().max(20),
  colorHex: Joi.string().required().max(20),
  smallSize: Joi.number().required().integer(),
  mediumSize: Joi.number().required().integer(),
  largeSize: Joi.number().required().integer(),
  xLargeSize: Joi.number().required().integer(),
  xxLargeSize: Joi.number().required().integer(),
  imageCover: Joi.string().required(),
  imageDetail: Joi.string().required(),
  images: Joi.array().items(Joi.string()),
  ratingsQuantity: Joi.number(),
  ratingsAverage: Joi.number(),
  slug: Joi.string().max(50),
  createdAt: Joi.date(),
});
