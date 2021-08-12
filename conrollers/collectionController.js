const Collection = require('../models/collectionModel');
const catchAsync = require('../utils/catchAsync');

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
