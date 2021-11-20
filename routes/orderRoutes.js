const express = require('express');

const authController = require('../conrollers/authController');
const orderController = require('../conrollers/orderController');

const router = express.Router();

router.use(authController.protect);

router.get('/myorders', orderController.getMyOrders);

router.use(authController.restrictTo('admin'));

router.route('/').get(orderController.getAllOrders);
router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(orderController.updateOrder);

module.exports = router;
