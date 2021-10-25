const multer = require('multer');
const sharp = require('sharp');
const Collection = require('../models/collectionModel');
const catchAsync = require('../utils/catchAsync');
const { Readable } = require('stream');
const { GridFsStorage } = require('multer-gridfs-storage');
const AppError = require('../utils/AppError');
const { findOneAndDelete } = require('../models/collectionModel');
const Shopping = require('../models/shoppingModel');
const Product = require('../models/productModel');
const Image = require('../models/imageModel');

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

exports.uploadImage = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'image', maxCount: 1 },
  { name: 'imageHero', maxCount: 1 },
  { name: 'imageDetail', maxCount: 1 },
  { name: 'imageOverview', maxCount: 1 },
]);

exports.resizeImage = catchAsync(async (req, res, next) => {
  if (!req.files) return next();

  if (req.files.imageCover) {
    req.body.imageCover = `collection_imageCover_${Date.now()}`;
    const data = await sharp(req.files.imageCover[0].buffer)
      .resize(1500, 300)
      .toFormat('jpeg')
      .jpeg({ quality: 100 })
      .toBuffer();

    const fileStream = Readable.from(data);
    await storage(req.body.imageCover).fromStream(
      fileStream,
      req,
      req.files.imageCover[0]
    );
  }

  if (req.files.imageHero) {
    req.body.imageHero = `collection_imageHero_${Date.now()}`;
    const data = await sharp(req.files.imageHero[0].buffer)
      .resize(1500, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 100 })
      .toBuffer();

    const fileStream = Readable.from(data);
    await storage(req.body.imageHero).fromStream(
      fileStream,
      req,
      req.files.imageHero[0]
    );
  }

  // image for section
  if (req.files.image) {
    req.body.image = `collection_image_${Date.now()}`;
    const data = await sharp(req.files.image[0].buffer)
      .resize(1500, 1500)
      .toFormat('jpeg')
      .jpeg({ quality: 100 })
      .toBuffer();

    const fileStream = Readable.from(data);
    await storage(req.body.image).fromStream(
      fileStream,
      req,
      req.files.image[0]
    );
  }

  // image for navbar
  if (req.files.imageDetail) {
    req.body.imageDetail = `collection_imageDetail_${Date.now()}`;
    const data = await sharp(req.files.imageDetail[0].buffer)
      .resize(1000, 1200)
      .toFormat('jpeg')
      .jpeg({ quality: 100 })
      .toBuffer();

    const fileStream = Readable.from(data);
    await storage(req.body.imageDetail).fromStream(
      fileStream,
      req,
      req.files.imageDetail[0]
    );
  }

  // image for the shop page
  if (req.files.imageOverview) {
    req.body.imageOverview = `collection_imageOverview_${Date.now()}`;
    const data = await sharp(req.files.imageOverview[0].buffer)
      .resize(750, 900)
      .toFormat('jpeg')
      .jpeg({ quality: 100 })
      .toBuffer();

    const fileStream = Readable.from(data);
    await storage(req.body.imageOverview).fromStream(
      fileStream,
      req,
      req.files.imageOverview[0]
    );
  }

  next();
});

exports.getBestSellersCollection = catchAsync(async (req, res, next) => {
  // 1) find best sellers products
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

  const products = await Product.find({ _id: { $in: productIds } }).select(
    'name  type imageCover imageDetail size price sale color cut  collar collectionId createdAt status colorHex slug fabric'
  );
  // 2) find the best sellers imageCover from Image
  const doc = await Image.findOne({ slug: 'best-sellers' });
  let imageCover;
  if (doc) imageCover = doc.imageCover;
  // 3) send res as a collections
  res.status(200).json({
    status: 'success',
    data: {
      collection: {
        name: 'best sellers',
        imageCover,
        products,
      },
    },
  });
});

exports.getNewReleasesCollection = catchAsync(async (req, res, next) => {
  // 1) get the new products
  const products = await Product.find({
    createdAt: {
      $gte: new Date(new Date().setDate(new Date().getDate() - 60)),
    },
  }).select(
    'name  type imageCover imageDetail size price sale color cut  collar collectionId createdAt status colorHex slug fabric'
  );
  // 2) find the new releases imageCover
  const doc = await Image.findOne({ slug: 'new-releases' });
  let imageCover;
  if (doc) imageCover = doc.imageCover;
  // 3) send res as a collection
  res.status(200).json({
    status: 'success',
    data: {
      collection: {
        name: 'new releases',
        products,
        imageCover,
      },
    },
  });
});

// for front end render
exports.getCollectionWithProducts = catchAsync(async (req, res, next) => {
  // check params
  if (req.params.slug === 'all-products') {
    req.filter = {};
    return next();
  } else if (req.params.slug === 'crew-neck') {
    req.filter = { collar: 'crew' };
    return next();
  } else if (req.params.slug === 'v-neck') {
    req.filter = { collar: 'v-neck' };
    return next();
  } else if (req.params.slug === 'henley') {
    req.filter = { collar: 'henley' };
    return next();
  } else if (req.params.slug === 'classic') {
    req.filter = { cut: 'classic' };
    return next();
  } else if (req.params.slug === 'split') {
    req.filter = { cut: 'split' };
    return next();
  } else if (req.params.slug === 'elongated') {
    req.filter = { cut: 'elongated' };
    return next();
  } else if (req.params.slug === 't-shirt') {
    req.filter = { type: 't-shirt' };
    return next();
  } else if (req.params.slug === 'sweat-shirt') {
    req.filter = { type: 'sweat-shirt' };
    return next();
  } else if (req.params.slug === 'long-sleeve') {
    req.filter = { type: 'long-sleeve' };
    return next();
  } else if (req.params.slug === 'polo') {
    req.filter = { type: 'polo' };
    return next();
  } else if (req.params.slug === 'hooded-shirt') {
    req.filter = { type: 'hooded-shirt' };
    return next();
  }
  // 1) get the name of the collection
  const slug = req.params.slug;
  // 2) find the collection and populate the products
  const collection = await Collection.findOne({ slug }).populate({
    path: 'products',
    select:
      'name  type imageCover imageDetail size price sale color cut  collar collectionId createdAt status colorHex slug fabric',
  });
  // 3) if no collection sen err
  if (!collection) return next(new AppError('No document found.', 404));
  // 4) send res.
  res.status(200).json({
    status: 'success',
    data: {
      collection,
    },
  });
});

// get product as a collection for filter
exports.getProductAsCollection = catchAsync(async (req, res, next) => {
  // 1) filter the products with req.filter
  const products = await Product.find(req.filter).select(
    'name  type imageCover imageDetail size price sale color cut  collar collectionId createdAt status colorHex slug fabric'
  );
  // 2) find the imageCover
  const doc = await Image.findOne({ slug: req.params.slug });
  let imageCover;
  if (doc) imageCover = doc.imageCover;
  // 3) send res as a collection
  res.status(200).json({
    status: 'success',
    data: {
      collection: {
        name: req.params.slug,
        products,
        imageCover,
      },
    },
  });
});

exports.grtAllCollections = catchAsync(async (req, res, next) => {
  //  1) find collections
  const collections = await Collection.find();
  // 2) send res.
  res.status(200).json({
    status: 'success',
    results: collections.length,
    data: {
      collections,
    },
  });
});

exports.createNewCollection = catchAsync(async (req, res, next) => {
  // 1) create the collection
  const collection = await Collection.create(req.body);
  // 2) send response
  res.status(201).json({
    status: 'success',
    data: {
      collection,
    },
  });
});

exports.getCollectionById = catchAsync(async (req, res, next) => {
  // 1) get the id
  const { id } = req.params;
  // 2) find the collection and populate products
  const collection = await Collection.findById(id);
  // 3) if no cllection send error
  if (!collection)
    return next(new AppError('No document found with that ID.', 404));
  // 4) send res
  res.status(200).json({
    status: 'success',
    data: {
      collection,
    },
  });
});

exports.getDisplayedCollection = catchAsync(async (req, res, next) => {
  // const query = req.query;
  // let filter = { ...query };
  // 1) get the collection mode
  if (!req.query.mode && !req.query.name)
    return next(new AppError('Please use query values.', 400));
  // const { mode } = req.params;
  // 2) find the collection
  const collection = await Collection.find(req.query);
  // 3) if no collection continue
  if (!collection) return next(new AppError('No document found.', 404));
  // 4) send res
  res.status(200).json({
    status: 'success',
    data: {
      collection,
    },
  });
});

exports.getCollectionProducts = catchAsync(async (req, res, next) => {
  let limit;
  if (req.query.limit) {
    limit = Number(req.query.limit);
    req.query.limit = undefined;
  }
  // 1) get the id
  if (!req.query.mode && !req.query.name)
    return next(new AppError('Please use query values.', 400));
  // 2) find the collection and populate products
  const collection = await Collection.findOne(req.query).populate({
    path: 'products',
    select:
      'collar color name imageCover imageDetail model price sale type cut size',
    options: { limit: limit },
  });
  // 3) if no cllection send error
  if (!collection)
    return next(new AppError('No document found with that ID.', 404));
  // 4) send res
  res.status(200).json({
    status: 'success',
    data: {
      collection,
    },
  });
});

exports.getProductCollection = catchAsync(async (req, res, next) => {
  // 1) get the id
  const { id } = req.params;
  // 2) find the collection and populate products
  const collection = await Collection.findById(id).populate('products');
  // 3) if no cllection send error
  if (!collection)
    return next(new AppError('No document found with that ID.', 404));
  // 4) send res
  res.status(200).json({
    status: 'success',
    data: {
      collection,
    },
  });
});

exports.updateCollectionById = catchAsync(async (req, res, next) => {
  // 1) get the id
  const { id } = req.params;
  // 2) update the collection
  const collection = await Collection.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  // 3) if no collection send error
  if (!collection)
    return next(new AppError('No document found with that ID.', 404));
  // 4) send res
  res.status(200).json({
    status: 'success',
    data: {
      collection,
    },
  });
});

exports.deleteCollectionById = catchAsync(async (req, res, next) => {
  // 1) get the id
  const { id } = req.params;
  // 2) delete the collection
  const collection = await Collection.findByIdAndDelete(id);
  // 3) if no collection send error
  if (!collection)
    return next(new AppError('No document found with that ID.', 404));
  // 4) send res
  res.status(204).json({
    status: 'success',
  });
});
