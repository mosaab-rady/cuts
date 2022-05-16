const { default: slugify } = require('slugify');
const db = require('../db/index');
const productSchema = require('../db/productSchema');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  // 1) select all products
  const columns = `products.id,products.name,products.type,products.fabric,products.price,products.cut,products.collar,products.color,products.color_hex,products.small_size,products.medium_size,products.large_size,products.x_large_size,products.xx_large_size,products.image_cover,products.image_detail,products.slug`;

  const { rowCount, rows } = await db.query(`SELECT ${columns} FROM products`);
  // 2) send res
  res.status(200).json({
    status: 'success',
    result: rowCount,
    data: {
      products: rows,
    },
  });
});

exports.getProductById = catchAsync(async (req, res, next) => {
  // 1) get the id
  const { id } = req.params;
  // 2) select from database
  const columns = `products.id,products.name,products.type,products.fabric,products.price, products.cut, products.collar, products.color, products.color_hex, products.small_size,products.medium_size, products.large_size, products.x_large_size, products.xx_large_size,products.image_cover, products.image_detail, products.images, products.ratings_quantity, products.ratings_average, products.slug, products.created_at, fabrics.stretch,fabrics.anti_billing, fabrics.buttery_soft, fabrics.pre_shrunk, fabrics.wrinkle_free, fabrics.color_and_fit_retention, fabrics.breathable, fabrics.durable, fabrics.lightweight, fabrics.natural_softness, fabrics.material_and_care, fabrics.why_we_made_this,types.summary, cuts.size_and_fit`;

  const joins = `JOIN fabrics ON products.fabric = fabrics.name JOIN cuts ON products.cut=cuts.cut JOIN types ON products.type=types.type`;

  const { rowCount, rows } = await db.query(
    `SELECT ${columns} from products ${joins} WHERE id=$1`,
    [id]
  );
  // if no product found send err
  if (rowCount !== 1) {
    return next(new AppError('No product found with that ID.', 404));
  }
  // 3) send res
  res.status(200).json({
    status: 'success',
    data: {
      product: rows[0],
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  // 1) get body
  const { body } = req;
  body.slug = slugify(body.name, { lower: true });
  // 2) validate the body using Joi
  const validated_values = await productSchema.validateAsync(body);
  const query_values = Object.keys(validated_values).map((key) => {
    return validated_values[key];
  });

  // 3) insert to DB
  const columns = [];
  const columns_num = [];
  Object.keys(validated_values).forEach((key, i) => {
    columns.push(key);
    columns_num.push(`$${i + 1}`);
  });
  let query = `INSERT INTO products (${columns.join(
    ','
  )}) VALUES (${columns_num.join(',')})`;

  await db.query(query, query_values);

  // 3) send res
  res.status(201).json({
    status: 'success',
    data: {
      product: validated_values,
    },
  });
});

exports.updateProductById = catchAsync(async (req, res, next) => {
  // 1) get the ID
  const { id } = req.params;
  // 2) get the updated data
  const { body } = req;
  // 3) get the record
  const { rows, rowCount } = await db.query(
    'SELECT * FROM products WHERE id=$1',
    [id]
  );
  // 4) if the record does not exist
  if (rowCount !== 1) {
    return next(new AppError('No product found with that ID.', 404));
  }
  // 5) valdite the new values
  const newValues = { ...rows[0], ...body };
  const validated_values = await productSchema.validateAsync(newValues, {
    allowUnknown: true,
  });

  // 3) update the record
  // make an array of the records that will be updated based on the values that came in the request body to use it in  db.query function
  const query_values = Object.keys(body).map((key) => body[key]);
  query_values.push(id);

  const columns = [];
  Object.keys(body).forEach((key, i) => {
    columns.push(`${key}=$${i + 1}`);
  });

  const query = `UPDATE products SET ${columns.join(',')} WHERE id=$${
    columns.length + 1
  }`;

  await db.query(query, query_values);

  // 4) send res
  res.status(200).json({
    status: 'success',
    data: {
      product: validated_values,
    },
  });
});

exports.deleteProductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { rowCount } = await db.query('DELETE FROM products WHERE id=$1', [id]);
  if (rowCount !== 1) {
    return next(new AppError('No product found with that ID.', 404));
  }
  res.status(204).json({
    status: 'success',
  });
});

exports.getNewReleases = catchAsync(async (req, res, next) => {
  // 1) new releases products are the products from the last 6 month
  const condition = `created_at > current_date - 180`;

  const columns = `products.id,products.name,products.type,products.fabric,products.price,products.cut,products.collar,products.color,products.color_hex,products.small_size,products.medium_size,products.large_size,products.x_large_size,products.xx_large_size,products.image_cover,products.image_detail,products.slug`;

  const query = `SELECT ${columns} FROM products WHERE ${condition} `;
  const { rowCount, rows } = await db.query(query);
  // 2) send res
  res.status(200).json({
    status: 'success',
    result: rowCount,
    data: {
      products: rows,
    },
  });
});

exports.getTypeOverview = catchAsync(async (req, res, next) => {
  // 1) get the products type from params
  const { type } = req.params;
  // 2) make a condition and query
  const condition = `type = $1`;
  const query_values = [type];
  const columns =
    'products.id,products.name,products.type,products.fabric,products.price,products.cut,products.collar,products.color,products.color_hex,products.small_size,products.medium_size,products.large_size,products.x_large_size,products.xx_large_size,products.image_cover,products.image_detail,products.slug';

  const query = `SELECT ${columns} FROM products WHERE ${condition}`;
  // 3) select products
  const { rows, rowCount } = await db.query(query, query_values);
  // 4) send res
  res.status(200).json({
    status: 'success',
    result: rowCount,
    data: {
      products: rows,
    },
  });
});
