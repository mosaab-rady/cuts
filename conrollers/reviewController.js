const db = require('../db');
const reviewSchema = require('../db/reviewSchema');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.get_all_reviews = catchAsync(async (req, res, next) => {
  const query = `SELECT * FROM reviews `;

  const { rows, rowCount } = await db.query(query);

  res.status(200).json({
    status: 'success',
    result: rowCount,
    data: {
      reviews: rows,
    },
  });
});

exports.create_new_review = catchAsync(async (req, res, next) => {
  // 1) get request data from body
  const { body } = req;
  body.user_id = req.user.id;
  if (body.tall === '&lt;5ft 10in') body.tall = '<5ft 10in';
  // 2) check if the data is valid
  const validated_values = await reviewSchema.validateAsync(body);
  // 3) get [query_values]
  const query_values = Object.keys(validated_values).map(
    (key) => validated_values[key]
  );
  // 4) get columns and columns_num
  const columns = [];
  const columns_num = [];
  Object.keys(validated_values).forEach((key, i) => {
    columns.push(key);
    columns_num.push(`$${i + 1}`);
  });
  // 5) write query
  const query = `INSERT INTO reviews (${columns.join(
    ','
  )}) VALUES (${columns_num.join(',')}) RETURNING *`;
  // 6) insert into database
  const { rows } = await db.query(query, query_values);
  // 7) send res
  res.status(201).json({
    status: 'success',
    data: {
      review: rows[0],
    },
  });
});

exports.get_review_by_id = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const query = `SELECT * FROM reviews WHERE id=$1`;

  const { rows, rowCount } = await db.query(query, [id]);

  if (rowCount !== 1)
    return next(new AppError('NO review found with that ID.', 404));

  res.status(200).json({
    status: 'success',
    data: {
      review: rows[0],
    },
  });
});

exports.delete_review_by_id = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { rowCount } = await db.query(`SELECT * FROM reviews WHERE id=$1`, [
    id,
  ]);

  if (rowCount !== 1)
    return next(new AppError('No review found with that ID.', 404));

  await db.query(`DELETE FROM reviews WHERE id=$1`, [id]);

  res.status(204).json({
    status: 'success',
  });
});

//////////////////////////////
// const Review = require('../models/reviewModel');
// const AppError = require('../utils/AppError');
// const catchAsync = require('../utils/catchAsync');

// exports.getProductUserIds = (req, res, next) => {
//   req.body.product = req.params.productId;
//   req.body.user = req.user.id;
//   next();
// };

// exports.getAllReviews = catchAsync(async (req, res, next) => {
//   let filter = {};
//   if (req.params.productId) filter = { product: req.params.productId };
//   if (req.params.userid) filter = { user: req.params.userid };
//   let skip = 1;
//   if (req.query.skip) skip = req.query.skip;
//   let limit = '';
//   if (req.query.limit) limit = req.query.limit;
//   //  1) get all reviews and populate product and user
//   const reviews = await Review.find(filter)
//     .skip((Number(skip) - 1) * 5)
//     .limit(Number(limit))
//     .populate('product', 'name')
//     .populate('user');

//   res.status(200).json({
//     status: 'success',
//     results: reviews.length,
//     data: {
//       reviews,
//     },
//   });
// });

// exports.createNewReview = catchAsync(async (req, res, next) => {
//   // 1) create new document
//   const review = await Review.create(req.body);
//   // 2) send response
//   res.status(201).json({
//     status: 'success',
//     data: {
//       review,
//     },
//   });
// });

// exports.getReviewById = catchAsync(async (req, res, next) => {
//   // 1) get the id
//   const { id } = req.params;
//   // 2) get the review
//   const review = await Review.findById(id);
//   // 3) if no review send error
//   if (!review)
//     return next(new AppError('No document found with that ID.', 404));
//   // 4) send res
//   res.status(200).json({
//     status: 'success',
//     data: {
//       review,
//     },
//   });
// });

// exports.updateReviewbyId = catchAsync(async (req, res, next) => {
//   // 1) get the id
//   const { id } = req.params;
//   // 2) update the review
//   const review = await Review.findByIdAndUpdate(id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   // 3) if no review send error
//   if (!review)
//     return next(new AppError('No document found with that ID.', 404));
//   // 4) send res
//   res.status(200).json({
//     status: 'success',
//     data: {
//       review,
//     },
//   });
// });

// exports.deleteReviewById = catchAsync(async (req, res, next) => {
//   // 1) get the id
//   const { id } = req.params;
//   // 2) delete the review
//   const review = await Review.findByIdAndDelete(id);
//   // 3) if no review send error
//   if (!review)
//     return next(new AppError('No document found with that ID.', 404));
//   // 4) send res
//   res.status(204).json({
//     status: 'success',
//   });
// });
