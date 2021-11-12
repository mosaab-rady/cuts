const express = require('express');

const router = express.Router();

const fileController = require('../conrollers/fileController');
const collectionController = require('../conrollers/collectionController');
const authController = require('../conrollers/authController');

router
  .route('/image/:slug/:image')
  .get(fileController.getDocumentImage, fileController.getImage);

router
  .route('/image')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    fileController.getAllDocumentImages
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    collectionController.uploadImage,
    collectionController.resizeImage,
    fileController.createImage
  );

router
  .route('/image/:id')
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    collectionController.uploadImage,
    collectionController.resizeImage,
    fileController.updateImage
  );

router.route('/:filename').get(fileController.getImage);

module.exports = router;
