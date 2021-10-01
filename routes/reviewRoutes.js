const express = require('express');

const router = express.Router({ mergeParams: true });

const reviewController = require('../conrollers/reviewController');
const authController = require('../conrollers/authController');
const shoppingController = require('../conrollers/shoppingController');

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    reviewController.getProductUserIds,
    reviewController.createNewReview
  );

router
  .route('/addreview/:productId')
  .post(
    authController.protect,
    reviewController.getProductUserIds,
    shoppingController.hasBuyedProduct,
    reviewController.createNewReview
  );

router
  .route('/:id')
  .get(reviewController.getReviewById)
  .patch(reviewController.updateReviewbyId)
  .delete(reviewController.deleteReviewById);

module.exports = router;
