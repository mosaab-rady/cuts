const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

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

exports.getOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id)
    .populate({
      path: 'shoppings',
      populate: { path: 'product', select: 'name color price imageCover' },
    })
    .populate('user');

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!order) return next(new AppError('No document found with that ID.', 404));

  res.status(200).json({
    status: 'success',
    data: {
      order,
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
