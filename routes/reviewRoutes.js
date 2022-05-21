const express = require('express');

const router = express.Router({ mergeParams: true });

const reviewController = require('../conrollers/reviewController');
const authController = require('../conrollers/authController');
const shoppingController = require('../conrollers/shoppingController');

router.route('/').get(reviewController.get_all_reviews).post(
  authController.protect,
  //     reviewController.getProductUserIds,
  reviewController.create_new_review
);

// router
//   .route('/addreview/:productId')
//   .post(
//     authController.protect,
//     reviewController.getProductUserIds,
//     shoppingController.hasBuyedProduct,
//     reviewController.createNewReview
//   );

// router.use(authController.protect, authController.restrictTo('admin'));

router
  .route('/:id')
  .get(reviewController.get_review_by_id)
  //   .patch(reviewController.updateReviewbyId)
  .delete(reviewController.delete_review_by_id);

module.exports = router;
