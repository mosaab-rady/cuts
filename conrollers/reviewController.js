const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  //  1) get all reviews and populate product and user
  const reviews = await Review.find()
    .populate('product', 'name')
    .populate('user');

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createNewReview = catchAsync(async (req, res, next) => {
  // get the user from the req.user
  req.body.user = req.user.id;
  // 1) create new document
  const review = await Review.create(req.body);
  // 2) send response
  res.status(201).json({
    status: 'success',
    data: {
      review,
    },
  });
});
