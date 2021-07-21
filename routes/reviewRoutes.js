const express = require('express');

const router = express.Router();

const reviewController = require('../conrollers/reviewController');
const authController = require('../conrollers/authController');

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(authController.protect, reviewController.createNewReview);

module.exports = router;
