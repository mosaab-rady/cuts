const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./productModel');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review can not be empty!.'],
  },
  title: {
    type: String,
    required: [true, 'Review must have title'],
  },
  score: {
    type: Number,
    required: [true, 'Review must have score.'],
    min: 1,
    max: 5,
  },
  fit: {
    type: String,
    enum: ['small', 'trim', 'perfect', 'loose', 'large'],
  },
  bodyType: {
    type: String,
    enum: ['slim', 'athletic', 'muscular', 'curvy'],
  },
  size: {
    type: String,
    enum: ['s', 'm', 'l', 'xL', 'xxL'],
  },
  tall: {
    type: String,
    enum: ['<5ft 10in', '5ft 10in - 6ft 0in', '6ft 1in - 6ft 3in', '>6ft 3in'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Review must belonng to product.'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, ' Review must belong to user.'],
  },
});

reviewSchema.statics.calcAverageRatings = async function (productId) {
  const stats = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: '$product',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$score' },
      },
    },
  ]);

  console.log(stats);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].nRating,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: 4.5,
      ratingsQuantity: 0,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.product);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
