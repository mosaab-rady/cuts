const express = require('express');

const shoppingController = require('../conrollers/shoppingController');
const authController = require('../conrollers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/myshoppings', shoppingController.getMyShopping);

router.post(
  '/checkout-session',

  shoppingController.getCheckoutSession
);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(shoppingController.getAllShopping)
  .post(shoppingController.createNewShopping);

router.route('/:id').get(shoppingController.getShopping);

module.exports = router;
