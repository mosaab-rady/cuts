const mongoose = require('mongoose');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const url = process.env.DATABASE;
const Image = require('../models/imageModel');

const connect = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
connect.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: 'photos',
  });
});

exports.getAllDocumentImages = catchAsync(async (req, res, next) => {
  const documents = await Image.find();
  res.status(200).json({
    status: 'success',
    data: {
      documents,
    },
  });
});

exports.createImage = catchAsync(async (req, res, next) => {
  // 1) create image
  const image = await Image.create(req.body);
  // 2) send res.
  res.status(201).json({
    status: 'success',
    data: {
      image,
    },
  });
});

exports.updateImage = catchAsync(async (req, res, next) => {
  // 1) get the id
  const { id } = req.params;
  // 2) update the image
  const image = await Image.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  // 3) if no image send err.
  if (!image) return next(new AppError('No document found.', 404));
  // 4) sen res.
  res.status(200).json({
    status: 'success',
    data: {
      image,
    },
  });
});

exports.getDocumentImage = catchAsync(async (req, res, next) => {
  // 1) get the name
  const { name } = req.params;
  // 2) find document
  const document = await Image.findOne({ name });
  // 3) if no document send err
  if (!document) return next(new AppError('No document found.', 404));
  // 4) get the image file name
  if (req.params.image === 'image') req.params.filename = document.image;
  if (req.params.image === 'imageCover')
    req.params.filename = document.imageCover;
  if (req.params.image === 'imageHero')
    req.params.filename = document.imageHero;
  // 5) next get image
  next();
});

exports.getImage = catchAsync(async (req, res, next) => {
  let fileName;
  if (req.params.filename) {
    fileName = req.params.filename;

    await gfs.find({ filename: fileName }).toArray((err, files) => {
      if (!files[0] || files.length === 0) {
        return next(new AppError('no files', 404));
      }
      gfs.openDownloadStreamByName(fileName).pipe(res);
    });
  }
});
