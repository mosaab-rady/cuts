const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Shopping = require('../models/shoppingModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const products = req.body.products;
  const items = products.map((item) => {
    return {
      name: item.name,
      amount: item.price * 100,
      currency: 'usd',
      quantity: item.quantity,
      images: [
        `${req.protocol}://${req.get('host')}/api/v1/images/${item.image}`,
      ],
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: items,
    payment_method_types: ['card'],
    mode: 'payment',
    cancel_url: 'http://localhost:3000',
    success_url: 'http://localhost:3000',
    shipping_address_collection: {
      allowed_countries: ['AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'EG'],
    },
  });

  res.status(200).json({
    status: 'success',
    session,
  });
});

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
