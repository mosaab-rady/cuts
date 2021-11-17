const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find()
    .populate({
      path: 'shoppings',
      populate: { path: 'product', select: 'name color' },
    })
    .populate('user', 'email');

  res.status(200).json({
    status: 'success',
    data: {
      orders,
    },
  });
});

exports.getMyOrders = catchAsync(async (req, res, next) => {
  const id = req.user.id;
  const orders = await Order.find({ user: id }).populate({
    path: 'shoppings',
    populate: { path: 'product', select: 'name color' },
  });

  res.status(200).json({
    status: 'success',
    data: {
      orders,
    },
  });
});
