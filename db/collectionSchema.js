const Joi = require('joi');

const collectionSchema = Joi.object({
  name: Joi.string().required().max(30),
  image_hero: Joi.string().allow(null),
  image_cover: Joi.string().required(),
  iamge_detail: Joi.string().allow(null),
  image_overview: Joi.string().allow(null),
  image: Joi.string().allow(null),
  created_at: Joi.date(),
  mode: Joi.string()
    .default('none')
    .valid('main', 'first', 'second', 'third', 'none'),
  slug: Joi.string().allow(null),
});

module.exports = collectionSchema;
