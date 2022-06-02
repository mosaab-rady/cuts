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

const resizeImage = async (buffer, height, width) => {
  return await sharp(buffer)
    .resize(height, width)
    .toFormat('jpeg')
    .jpeg({ quality: 100 })
    .toBuffer();
};

exports.resizeImageAndUploadToS3 = catchAsync(async (req, res, next) => {
  // // check if there is images
  if (!req.files) return next();

  if (req.files.image_cover) {
    // resize using sharp
    const buffer = await resizeImage(
      req.files.image_cover[0].buffer,
      1500,
      300
    );

    const fileStream = Readable.from(buffer);
    //  upload to s3
    req.body.image_cover = await new Image(
      `image_cover_${Date.now()}.jpeg`,
      fileStream
    ).upload();
  }

  if (req.files.image_hero) {
    const buffer = await resizeImage(req.files.image_hero[0].buffer, 1500, 600);

    const fileStream = Readable.from(buffer);

    req.body.image_hero = await new Image(
      `image_hero_${Date.now()}.jpeg`,
      fileStream
    ).upload();
  }

  // image for section
  if (req.files.image) {
    const buffer = await resizeImage(req.files.image[0].buffer, 1500, 1500);

    const fileStream = Readable.from(buffer);

    req.body.image = await new Image(
      `image_${Date.now()}.jpeg`,
      fileStream
    ).upload();
  }

  // image for navbar
  if (req.files.image_detail) {
    const buffer = await resizeImage(
      req.files.image_detail[0].buffer,
      1000,
      1200
    );

    const fileStream = Readable.from(buffer);

    req.body.image_detail = await new Image(
      `image_detail_${Date.now()}.jpeg`,
      fileStream
    );
  }

  // image for the shop page
  if (req.files.image_overview) {
    const buffer = await resizeImage(
      req.files.image_overview[0].buffer,
      750,
      900
    );

    const fileStream = Readable.from(buffer);

    req.body.image_overview = await new Image(
      `image_overview_${Date.now()}.jpeg`,
      fileStream
    ).upload();
  }

  if (req.files.images) {
    const images = [];
    for (let i = 0; i < req.files.images.length; i++) {
      const buffer = await resizeImage(req.files.images[i].buffer, 1500, 1500);

      const fileStream = Readable.from(buffer);

      images.push(
        await new Image(`product_image_${Date.now()}.jpeg`, fileStream).upload()
      );
    }
    req.body.images = images;
  }

  next();
});
