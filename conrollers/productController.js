const Product = require('../models/productModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const sharp = require('sharp');
const { Readable } = require('stream');
const Shopping = require('../models/shoppingModel');

exports.getCollectionId = (req, res, next) => {
  if (req.params.collectionId) req.body.collectionId = req.params.collectionId;
  next();
};

const storage = (filename) =>
  new GridFsStorage({
    url: process.env.DATABASE,
    file: (req, file) => {
      return { filename, bucketName: 'photos' };
    },
    options: { useUnifiedTopology: true },
  });

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  fileFilter: multerFilter,
});

exports.uploadProductImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'imageDetail', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

exports.resizeProductImages = catchAsync(async (req, res, next) => {
  if (!req.files) return next();

  if (req.files.imageCover) {
    req.body.imageCover = `product_cover_${Date.now()}`;
    const data = await sharp(req.files.imageCover[0].buffer)
      .resize(1000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toBuffer();

    const fileStream = Readable.from(data);
    await storage(req.body.imageCover).fromStream(
      fileStream,
      req,
      req.files.imageCover[0]
    );
  }

  if (req.files.imageDetail) {
    req.body.imageDetail = `product_detail_${Date.now()}`;
    const data = await sharp(req.files.imageDetail[0].buffer)
      .resize(1000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toBuffer();

    const fileStream = Readable.from(data);
    await storage(req.body.imageDetail).fromStream(
      fileStream,
      req,
      req.files.imageDetail[0]
    );
  }

  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (file, i) => {
        const filename = `product_${Date.now()}_${i + 1}`;
        req.body.images.push(filename);

        const data = await sharp(file.buffer)
          .resize(1000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toBuffer();

        const fileStream = Readable.from(data);

        await storage(filename).fromStream(fileStream, req, file);
      })
    );
  }

  next();
});

exports.getNewReleases = catchAsync(async (req, res, next) => {
  const products = await Product.find({
    createdAt: {
      $gte: new Date(new Date().setDate(new Date().getDate() - 60)),
    },
  }).select(
    'name  type imageCover imageDetail size price sale color cut  collar collectionId createdAt status'
  );
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products,
    },
  });
});

exports.getBestSellers = catchAsync(async (req, res, next) => {
  let limit = '';
  if (req.query.limit) limit = req.query.limit;

  const aggregate = await Shopping.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
        },
      },
    },
    { $group: { _id: '$product', count: { $sum: 1 } } },
    { $match: { count: { $gt: 10 } } },
  ]);

  const productIds = aggregate.map((item) => {
    return item._id;
  });

  const products = await Product.find({ _id: { $in: productIds } })
    .select(
      'name  type imageCover imageDetail size price sale color cut  collar collectionId createdAt status colorHex'
    )
    .limit(Number(limit));

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products,
    },
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  let filter;
  filter = { ...req.query };
  const products = await Product.find(filter).select(
    'name  type imageCover imageDetail size price sale color cut  collar collectionId createdAt status colorHex'
  );
  res.status(200).json({
    status: 'success',
    results: products.length,
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

exports.getSingleProduct = catchAsync(async (req, res, next) => {
  //  1) get the query
  let filter = {};
  if (req.query.type) filter.type = req.query.type;
  if (req.query.fabric) filter.fabric = req.query.fabric;
  if (req.query.cut) filter.cut = req.query.cut;
  if (req.query.collar) filter.collar = req.query.collar;
  //  2) find the product
  const product = await Product.findOne(filter);

  // 3) if no product send err
  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  // find all model colors
  const colors = await Product.find({
    type: product.type,
    cut: product.cut,
    collar: product.collar,
    fabric: product.fabric,
  }).select('color createdAt colorHex ');

  const fabrics = await Product.aggregate([
    {
      $match: {
        type: product.type,
        cut: product.cut,
        collar: product.collar,
      },
    },
    {
      $group: { _id: '$fabric' },
    },
  ]);

  // 4) send the res
  res.status(200).json({
    status: 'success',
    data: {
      product,
      availableColors: colors,
      fabrics,
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
    type: product.type,
    cut: product.cut,
    collar: product.collar,
    fabric: product.fabric,
  }).select('color createdAt colorHex ');

  const fabrics = await Product.aggregate([
    {
      $match: {
        type: product.type,
        cut: product.cut,
        collar: product.collar,
      },
    },
    {
      $group: { _id: '$fabric' },
    },
  ]);

  // 4) send the res
  res.status(200).json({
    status: 'success',
    data: {
      product,
      availableColors: colors,
      fabrics,
    },
  });
});

exports.updateProductById = catchAsync(async (req, res, next) => {
  // 1) get the ID
  const { id } = req.params;

  // 2) update the product
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  // 3) if the product does not exist
  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }
  // 4) send the updated product
  res.status(200).json({
    status: 'success',
    data: {
      product,
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
