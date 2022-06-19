const express = require('express');

const router = express.Router();

const collectionController = require('../conrollers/collectionController');
const imagesController = require('../conrollers/ImageController');
const authController = require('../conrollers/authController');

// router
//   .route('/testPic')
//   .post(
//     imagesController.multerUploadImages,
//     imagesController.resizeImageAndUploadToS3
//   );

// router.use('/:collectionId/product', productRoutes);

// router
//   .route('/collections/best-sellers')
//   .get(collectionController.getBestSellersCollection);

// router
//   .route('/collections/new-releases')
//   .get(collectionController.getNewReleasesCollection);

// router
//   .route('/collections/:slug')
//   .get(
//     collectionController.getCollectionWithProducts,
//     collectionController.getProductAsCollection
//   );

// router
//   .route('/account/collections/:slug')
//   .get(
//     authController.protect,
//     authController.restrictTo('admin'),
//     collectionController.getAccountCollection
//   );

// router
//   .route('/account/default-collections/:slug')
//   .get(
//     authController.protect,
//     authController.restrictTo('admin'),
//     collectionController.getAccountDefaultCollections
//   );

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    collectionController.grtAllCollections
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    //     collectionController.uploadImage,
    //     collectionController.resizeImage,
    collectionController.createNewCollection
  );

router.route('/display').get(collectionController.getDisplayedCollection);
// router
//   .route('/display/products')
//   .get(collectionController.getCollectionProducts);

router
  .route('/:id')
  .get(collectionController.getCollectionById)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    //     collectionController.uploadImage,
    //     collectionController.resizeImage,
    collectionController.updateCollectionById
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    collectionController.deleteCollectionById
  );

router.route('/:id/products').get(collectionController.getProductCollection);

module.exports = router;
