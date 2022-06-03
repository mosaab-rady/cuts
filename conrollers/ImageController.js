const multer = require('multer');
const sharp = require('sharp');
// const S3 = require('aws-sdk/clients/s3');
const { Readable } = require('stream');
const catchAsync = require('../utils/catchAsync');
const Image = require('../utils/image');

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

exports.multerUploadImages = upload.fields([
  { name: 'image_cover', maxCount: 1 },
  { name: 'image', maxCount: 1 },
  { name: 'image_hero', maxCount: 1 },
  { name: 'image_detail', maxCount: 1 },
  { name: 'image_overview', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

const resizeImage = async ({ buffer, height, width }) => {
  return await sharp(buffer)
    .resize(width, height)
    .toFormat('jpeg')
    .jpeg({ quality: 100 })
    .toBuffer();
};

exports.resizeImageAndUploadToS3 = catchAsync(async (req, res, next) => {
  // // check if there is images
  if (!req.files) return next();

  if (req.files.image_cover) {
    // resize using sharp
    const buffer = await resizeImage({
      buffer: req.files.image_cover[0].buffer,
      width: 1500,
      height: 300,
    });

    const fileStream = Readable.from(buffer);
    //  upload to s3
    req.body.image_cover = await new Image().upload({
      body: fileStream,
      key: `image_cover_${Date.now()}.jpeg`,
    });
  }

  if (req.files.image_hero) {
    const buffer = await resizeImage({
      buffer: req.files.image_hero[0].buffer,
      width: 1500,
      height: 600,
    });

    const fileStream = Readable.from(buffer);

    req.body.image_hero = await new Image().upload({
      body: fileStream,
      key: `image_hero_${Date.now()}.jpeg`,
    });
  }

  // image for section
  if (req.files.image) {
    const buffer = await resizeImage({
      buffer: req.files.image[0].buffer,
      width: 1500,
      height: 1500,
    });

    const fileStream = Readable.from(buffer);

    req.body.image = await new Image().upload({
      body: fileStream,
      key: `image_${Date.now()}.jpeg`,
    });
  }

  // image for navbar
  if (req.files.image_detail) {
    const buffer = await resizeImage({
      buffer: req.files.image_detail[0].buffer,
      width: 1000,
      height: 1200,
    });

    const fileStream = Readable.from(buffer);

    req.body.image_detail = await new Image().upload({
      body: fileStream,
      key: `image_detail_${Date.now()}.jpeg`,
    });
  }

  // image for the shop page
  if (req.files.image_overview) {
    const buffer = await resizeImage({
      buffer: req.files.image_overview[0].buffer,
      width: 750,
      height: 900,
    });

    const fileStream = Readable.from(buffer);

    req.body.image_overview = await new Image().upload({
      body: fileStream,
      key: `image_overview_${Date.now()}.jpeg`,
    });
  }

  if (req.files.images) {
    const images = [];
    for (let i = 0; i < req.files.images.length; i++) {
      const buffer = await resizeImage({
        buffer: req.files.images[i].buffer,
        width: 1500,
        height: 1500,
      });

      const fileStream = Readable.from(buffer);

      images.push(
        await new Image().upload({
          key: `product_image_${Date.now()}.jpeg`,
          body: fileStream,
        })
      );
    }
    req.body.images = images;
  }

  next();
});
