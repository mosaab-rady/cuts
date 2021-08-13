const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema(
  {
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
