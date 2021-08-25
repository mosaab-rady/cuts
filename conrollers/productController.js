const Product = require('../models/productModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const sharp = require('sharp');
const { Readable } = require('stream');

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

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find().select(
    'name model type imageCover imageDetail size price sale color cut  collar collectionId'
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

exports.getProductById = catchAsync(async (req, res, next) => {
  //  1) get the id
  const { id } = req.params;
  //  2) find the product
  const product = await Product.findById(id).populate('reviews');

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
