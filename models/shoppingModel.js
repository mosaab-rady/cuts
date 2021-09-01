const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  paid: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  price: {
    type: Number,
    required: [true, 'Shopping must have a price.'],
  },
});

shoppingSchema.index({ product: 1 });

const Shopping = mongoose.model('Shopping', shoppingSchema);

module.exports = Shopping;
