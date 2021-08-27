const mongoose = require('mongoose');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const url = process.env.DATABASE;

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
