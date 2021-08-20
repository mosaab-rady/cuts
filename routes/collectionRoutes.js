const express = require('express');

const router = express.Router();

const collectionController = require('../conrollers/collectionController');
const productRoutes = require('./productRoutes');

// router
//   .route('/testPic')
//   .post(collectionController.uploadImage, collectionController.resizeImage);

router.use('/:collectionId/product', productRoutes);

router
  .route('/')
  .get(collectionController.grtAllCollections)
  .post(
    collectionController.uploadImage,
    collectionController.resizeImage,
    collectionController.createNewCollection
  );

router.route('/display').get(collectionController.getDisplayedCollection);
router
  .route('/display/products')
  .get(collectionController.getCollectionProducts);

router
  .route('/:id')
  .get(collectionController.getCollectionById)
  .patch(
    collectionController.uploadImage,
    collectionController.resizeImage,
    collectionController.updateCollectionById
  )
  .delete(collectionController.deleteCollectionById);

router.route('/:id/products').get(collectionController.getProductCollection);

module.exports = router;
