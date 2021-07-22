// create router
const express = require('express');
const router = express.Router();

const productController = require('../conrollers/productController');
const reviewRoutes = require('./reviewRoutes');

router.use('/:productid/reviews', reviewRoutes);

router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router
  .route('/:id')
  .get(productController.getProductById)
  .patch(productController.updateProductById)
  .delete(productController.deleteProduct);

module.exports = router;
