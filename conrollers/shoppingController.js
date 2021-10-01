const Shopping = require('../models/shoppingModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllShopping = catchAsync(async (req, res, next) => {
  // 1) finds all shopping
  const shoppings = await Shopping.find();
  // 2) send res
  res.status(200).json({
    status: 'success',
    results: shoppings.length,
    data: {
      shoppings,
    },
  });
});

exports.createNewShopping = catchAsync(async (req, res, next) => {
  // get the user id
  req.body.user = req.user.id;
  // 1) create shopping
  const shopping = await Shopping.create(req.body);
  // 2) send res
  res.status(201).json({
    status: 'success',
    data: {
      shopping,
    },
  });
});

exports.getShopping = catchAsync(async (req, res, next) => {
  // 1) get the shopping id from params
  const { id } = req.params;
  // 2) get the shopping and populate{product name}{user name}
  const shopping = await Shopping.findById(id)
    .populate('product', 'name')
    .populate('user', 'email name');
  // 3) send res
  res.status(200).json({
    status: 'success',
    data: {
      shopping,
    },
  });
});

exports.getMyShopping = catchAsync(async (req, res, next) => {
  // 1) get user id from req.user
  const userId = req.user.id;
  // 2) find the user shoppings
  const shoppings = await Shopping.find({ user: userId }).populate(
    'product',
    'name color'
  );
  // 3) send res
  res.status(200).json({
    status: 'success',
    data: {
      shoppings,
    },
  });
});

exports.hasBuyedProduct = catchAsync(async (req, res, next) => {
  const user = req.user.id;
  const product = req.params.productId;

  const shopping = await Shopping.findOne({ user, product });
  if (!shopping)
    return next(
      new AppError(
        'Please buy the product first to be able to add review.',
        400
      )
    );
  next();
});
