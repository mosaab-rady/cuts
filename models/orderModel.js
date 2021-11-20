const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  shoppings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shopping',
      required: [true, 'Order must have shoppings.'],
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to user.'],
  },
  phoneNum: Number,
  shippingAddress: {
    address: {
      city: String,
      country: String,
      line1: String,
      line2: String,
      postal_code: Number,
      state: String,
    },
    name: String,
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

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
