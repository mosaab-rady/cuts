const multer = require('multer');
const sharp = require('sharp');
const Collection = require('../models/collectionModel');
const catchAsync = require('../utils/catchAsync');
const { Readable } = require('stream');
const { GridFsStorage } = require('multer-gridfs-storage');
const AppError = require('../utils/AppError');
const { findOneAndDelete } = require('../models/collectionModel');

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

exports.uploadImage = upload.single('image');

exports.resizeImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.body.image = `collection_image_${Date.now()}`;
  const data = await sharp(req.file.buffer)
    .resize(1000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();

  const fileStream = Readable.from(data);
  await storage(req.body.image).fromStream(fileStream, req, req.file);

  next();
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
  const collection = await findOneAndDelete(id);
  // 3) if no collection send error
  if (!collection)
    return next(new AppError('No document found with that ID.', 404));
  // 4) send res
  res.status(204).json({
    status: 'success',
  });
});
