const db = require('../db/index');
const catchAsync = require('../utils/catchAsync');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  // 1) select all products
  const { rowCount, rows } = await db.query(
    'SELECT products.id,products.name,products.type,products.fabric,products.price,products.cut,products.collar,products.color,products.colorHex,products.smallSize,products.mediumSize,products.largeSize,products.xLargeSize,products.xxLargeSize,products.imageCover,products.imageDetail,products.slug FROM products'
  );
  // 2) send res
  res.status(200).json({
    status: 'success',
    result: rowCount,
    data: {
      products: rows,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  // 1) get body
  const { body } = req;
  // 2) insert to DB
  const query = await db.query(
    `INSERT INTO products (name, type, fabric, collectionId, sizeAndFit, materialAndCare, reason, price, summary, cut, collar, color, colorHex,smallSize,mediumSize,largeSize,xLargeSize,xxLargeSize,imageCover,imageDetail, images, ratingsQuantity, ratingsAverage, slug)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)`,
    [
      body.name,
      body.type,
      body.fabric,
      body.collectionId,
      body.sizeAndFit,
      body.materialAndCare,
      body.reason,
      body.price,
      body.summary,
      body.cut,
      body.collar,
      body.color,
      body.colorHex,
      body.smallSize,
      body.mediumSize,
      body.largeSize,
      body.xLargeSize,
      body.xxLargeSize,
      body.imageCover,
      body.imageDetail,
      body.images,
      body.ratingsQuantity,
      body.ratingsAverage,
      body.slug,
    ]
  );
  // 3) send res
  res.status(201).json({
    status: 'success',
    data: {
      query,
    },
  });
});
