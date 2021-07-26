const express = require('express');

const shoppingController = require('../conrollers/shoppingController');
const authController = require('../conrollers/authController');

const router = express.Router();

router.get(
  '/myshoppings',
  authController.protect,
  shoppingController.getMyShopping
);

router
  .route('/')
  .get(shoppingController.getAllShopping)
  .post(authController.protect, shoppingController.createNewShopping);

router.route('/:id').get(shoppingController.getShopping);

module.exports = router;
