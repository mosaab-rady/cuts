const express = require('express');

const authController = require('../conrollers/authController');
const orderController = require('../conrollers/orderController');

const router = express.Router();

router.use(authController.protect);

router.get('/myorders', orderController.getMyOrders);

router
  .route('/')
  .get(authController.restrictTo('admin'), orderController.getAllOrders);

module.exports = router;
