const mongoose = require('mongoose');
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

exports.getImage = (req, res, next) => {
  let fileName;
  if (req.params.filename) {
    fileName = req.params.filename;
    const findImgs = async () => {
      await new Promise((resolve, reject) => {
        gfs.find({ filename: fileName }).toArray((err, files) => {
          if (!files[0] || files.length === 0) {
            return reject(
              res.status(200).json({
                status: 'success',
                message: 'no files available',
              })
            );
          }
          resolve(gfs.openDownloadStreamByName(fileName).pipe(res));
        });
      });
    };
    findImgs();
  }
};
