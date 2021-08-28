const express = require('express');

const router = express.Router();

const fileController = require('../conrollers/fileController');
const collectionController = require('../conrollers/collectionController');

router
  .route('/image/:name/:image')
  .get(fileController.getDocumentImage, fileController.getImage);

router
  .route('/image')
  .post(
    collectionController.uploadImage,
    collectionController.resizeImage,
    fileController.createImage
  );

router
  .route('/image/:id')
  .patch(
    collectionController.uploadImage,
    collectionController.resizeImage,
    fileController.updateImage
  );

router.route('/:filename').get(fileController.getImage);

module.exports = router;
