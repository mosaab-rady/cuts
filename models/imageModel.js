const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An image must have a name.'],
    unique: true,
  },
  image: String,
  imageCover: String,
  imageHero: String,
});

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;
