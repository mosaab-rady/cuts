// create router
const express = require('express');
const router = express.Router({ mergeParams: true });

const productController = require('../conrollers/productController');
const reviewRoutes = require('./reviewRoutes');
const authController = require('../conrollers/authController');

router.use('/:productId/reviews', reviewRoutes);

// router
//   .route('/testPic')
//   .post(
//     productController.uploadProductImages,
//     productController.resizeProductImages
//   );

router.get('/new-releases', productController.getNewReleases);
router.get('/best-sellers', productController.getBestSellers);
router.get('/shirts/:slug', productController.getSingleProduct);
router.get('/overview/:type', productController.getTypeOverview);
router.get('/relatedcuts', productController.getRelatedCuts);
router.get(
  '/account/products',
  authController.protect,
  authController.restrictTo('admin'),
  productController.getAccountProducts
);

router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    productController.getCollectionId,
    productController.uploadProductImages,
    productController.resizeProductImages,
    productController.createProduct
  );

router
  .route('/:id')
  .get(productController.getProductById)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    productController.uploadProductImages,
    productController.resizeProductImages,
    productController.updateProductById
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    productController.deleteProduct
  );

module.exports = router;
