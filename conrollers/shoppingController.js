const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Shopping = require('../models/shoppingModel');
const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const products = req.body.products;
  // console.log(products);
  const items = products.map((item) => {
    return {
      name: item.name,
      amount: item.price * 100,
      currency: 'usd',
      quantity: item.quantity,
      description: `${item.color} ${item.name} size: ${item.size} `,
    };
  });

  let session = await stripe.checkout.sessions.create({
    line_items: items,
    metadata: { products: JSON.stringify(products) },
    payment_method_types: ['card'],
    mode: 'payment',
    cancel_url: `${req.protocol}://${req.get('host')}`,
    success_url: `${req.protocol}://${req.get('host')}/account`,
    customer_email: req.user.email,
    shipping_address_collection: {
      allowed_countries: ['AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'EG'],
    },
    phone_number_collection: {
      enabled: true,
    },
  });

  res.status(200).json({
    status: 'success',
    session,
  });
});

const createShoppingCheckout = async (session) => {
  const metadataProducts = JSON.parse(session.metadata.products);
  const user = (await User.findOne({ email: session.customer_email })).id;
  metadataProducts.forEach(async (elm) => {
    await Shopping.create({
      product: elm.id,
      user,
      price: elm.price,
      size: elm.size,
      quantity: elm.quantity,
    });
  });
};

exports.webhookCheckout = catchAsync(async (req, res, next) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    createShoppingCheckout(event.data.object);
  }

  res.status(200).json({ received: true });
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
