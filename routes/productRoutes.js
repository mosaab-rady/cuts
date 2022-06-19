// create router
const express = require('express');
const router = express.Router({ mergeParams: true });

const productController = require('../conrollers/productController');
const reviewRoutes = require('./reviewRoutes');
const authController = require('../conrollers/authController');
const imageController = require('../conrollers/ImageController');

router.use('/:productId/reviews', reviewRoutes);

router.get('/new-releases', productController.getNewReleases);
// router.get('/best-sellers', productController.getBestSellers);
// router.get('/shirts/:slug', productController.getSingleProduct);
router.get('/overview/:type', productController.getTypeOverview);
// router.get('/relatedcuts', productController.getRelatedCuts);
// router.get(
//   '/account/products',
//   authController.protect,
//   authController.restrictTo('admin'),
//   productController.getAccountProducts
// );

router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    imageController.multerUploadImages,
    imageController.resizeImageAndUploadToS3,
    productController.createProduct
  );

router
  .route('/:id')
  .get(productController.getProductById)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    imageController.multerUploadImages,
    imageController.resizeImageAndUploadToS3,
    productController.updateProductById
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    productController.deleteProductById
  );

module.exports = router;
