const Review = require('../models/reviewModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getProductUserIds = (req, res, next) => {
  req.body.product = req.params.productid;
  req.body.user = req.user.id;
  next();
};

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.productid) filter = { product: req.params.productid };
  if (req.params.userid) filter = { user: req.params.userid };
  //  1) get all reviews and populate product and user
  const reviews = await Review.find(filter)
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

exports.getReviewById = catchAsync(async (req, res, next) => {
  // 1) get the id
  const { id } = req.params;
  // 2) get the review
  const review = await Review.findById(id);
  // 3) if no review send error
  if (!review)
    return next(new AppError('No document found with that ID.', 404));
  // 4) send res
  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});

exports.updateReviewbyId = catchAsync(async (req, res, next) => {
  // 1) get the id
  const { id } = req.params;
  // 2) update the review
  const review = await Review.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  // 3) if no review send error
  if (!review)
    return next(new AppError('No document found with that ID.', 404));
  // 4) send res
  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});

exports.deleteReviewById = catchAsync(async (req, res, next) => {
  // 1) get the id
  const { id } = req.params;
  // 2) delete the review
  const review = await Review.findByIdAndDelete(id);
  // 3) if no review send error
  if (!review)
    return next(new AppError('No document found with that ID.', 404));
  // 4) send res
  res.status(204).json({
    status: 'success',
  });
});
