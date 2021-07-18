const Product = require('../models/productModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find().select(
    'name model type imageCover imageDetail size price sale color cut  collar'
  );
  res.status(200).json({
    status: 'success',
    products: products.length,
    data: {
      products,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.getProductById = catchAsync(async (req, res, next) => {
  //  1) get the id
  const { id } = req.params;
  //  2) find the product
  const product = await Product.findById(id);

  // 3) if no product send err
  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  // find all model colors
  const colors = await Product.find({
    model: product.model,
    fabric: product.fabric,
  }).select('color');

  // 4) send the res
  res.status(200).json({
    status: 'success',
    data: {
      product,
      availableColors: colors,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  // 1)get the id
  const { id } = req.params;
  // 2) check if product exist
  const product = await Product.findById(id);
  // 3) if no product send error
  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }
  // 4) delete the product
  await Product.findByIdAndDelete(id);
  res.status(204).json({
    status: 'success',
  });
});
