const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A collection must have a name'],
      unique: true,
    },
    imageHero: String,
    imageCover: String,
    image: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    mode: {
      type: String,
      enum: ['main', 'first', 'second', 'third'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

collectionSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'collectionId',
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
