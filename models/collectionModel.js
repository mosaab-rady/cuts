const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A collection must have a name'],
    unique: true,
  },
  image: String,
  summary: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

collectionSchema.virtual('products', {
  ref: 'Product',
  localField: 'name',
  foreignField: 'collectionName',
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
