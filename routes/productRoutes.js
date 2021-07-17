// create router
const express = require('express');
const router = express.Router();

const productController = require('../conrollers/productController');

router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router
  .route('/:id')
  .get(productController.getProductById)
  .delete(productController.deleteProduct);

module.exports = router;
