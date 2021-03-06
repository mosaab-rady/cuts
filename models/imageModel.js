const mongoose = require('mongoose');
const { default: slugify } = require('slugify');

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An image must have a name.'],
    unique: true,
  },
  slug: String,
  image: String,
  imageDetail: String,
  imageCover: {
    type: String,
    required: [true, 'A collection must have an Image cover'],
  },
  imageHero: String,
  imageOverview: String,
});

imageSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;
