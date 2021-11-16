const mongoose = require('mongoose');
const AppError = require('../utils/AppError');
const Schema = mongoose.Schema;
const Product = require('./productModel');

const shoppingSchema = new mongoose.Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Shopping must belong to product.'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Shopping must belong to user.'],
  },
  price: {
    type: Number,
    required: [true, 'Shopping must have a price.'],
  },
  size: {
    type: String,
    enum: ['s', 'm', 'l', 'xl', 'xxl'],
  },
  quantity: {
    type: Number,
    default: 1,
  },
  paid: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  delivered: {
    type: Boolean,
    default: false,
  },
});

// shoppingSchema.index({ product: 1 });
shoppingSchema.index({ user: 1 });

// shoppingSchema.pre('save', async function (next) {
//   // 1) find the product
//   const product = await Product.findById(this.product).select('size');
//   console.log(product);
//   // 2) sheck if the size is available
//   if (this.size === 'small') {
//     if (product.size.small === 0) {
//       return next(new AppError('This size is not available now.', 400));
//     } else {
//       return next();
//     }
//   } else if (this.size === 'medium') {
//     if (product.size.medium === 0) {
//       return next(new AppError('This size is not available now.', 400));
//     } else {
//       return next();
//     }
//   } else if (this.size === 'large') {
//     if (product.size.large === 0) {
//       return next(new AppError('This size is not available now.', 400));
//     }
//   } else if (this.size === 'xLarge') {
//     if (product.size.xLarge === 0) {
//       return next(new AppError('This size is not available now.', 400));
//     } else {
//       return next();
//     }
//   } else if (this.size === 'xxLarge') {
//     if (product.size.xxLarge === 0) {
//       return next(new AppError('This size is not available now.', 400));
//     } else {
//       return next();
//     }
//   }
// });

const Shopping = mongoose.model('Shopping', shoppingSchema);

module.exports = Shopping;
