const db = require('../db');
const fabricShema = require('../db/fabricSchema');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.get_all_fabrics = catchAsync(async (req, res, next) => {
  const columns = `*`;
  const query = `SELECT ${columns} FROM fabrics`;
  const { rowCount, rows } = await db.query(query);
  res.status(200).json({
    status: 'success',
    result: rowCount,
    data: {
      fabrics: rows,
    },
  });
});

exports.get_fabric_by_name = catchAsync(async (req, res, next) => {
  // 1)  get name
  const { name } = req.params;
  // 2) select from database
  const query = `SELECT * FROM fabrics WHERE name=$1`;
  const { rows, rowCount } = await db.query(query, [name]);
  // 3) check if fabric exist
  if (rowCount !== 1) {
    return next(new AppError('No fabric found with that name.', 404));
  }
  // 4) send res
  res.status(200).json({
    status: 'success',
    data: {
      fabric: rows[0],
    },
  });
});

exports.create_new_fabric = catchAsync(async (req, res, next) => {
  // 1) get request body
  const { body } = req;
  // 2) validate body
  const validated_values = await fabricShema.validateAsync(body);
  // 3) get query_values [array of values]
  const query_values = Object.keys(validated_values).map((key) => {
    return validated_values[key];
  });
  // 4) get query string
  const columns = [];
  const columns_num = [];
  Object.keys(validated_values).forEach((key, i) => {
    columns.push(key);
    columns_num.push(`$${i + 1}`);
  });
  const query = `INSERT INTO fabrics (${columns.join(
    ','
  )}) VALUES (${columns_num.join(',')})`;
  // 5) insert into database
  await db.query(query, query_values);
  // 6) send res
  res.status(201).json({
    status: 'success',
    data: {
      fabric: validated_values,
    },
  });
});

exports.update_fabric_by_name = catchAsync(async (req, res, next) => {
  // 1) get name from params and body
  const { name } = req.params;
  const { body } = req;
  // 2) check if the fabric exist
  const { rows, rowCount } = await db.query(
    'SELECT * FROM fabrics WHERE name=$1',
    [name]
  );
  if (rowCount !== 1) {
    return next(new AppError('No fabric found with that name.', 404));
  }
  // 3) validate new values
  const validated_values = await fabricShema.validateAsync({
    ...rows[0],
    ...body,
  });
  // 4) [array] of query values
  const query_values = Object.keys(body).map((key) => {
    return body[key];
  });
  query_values.push(name);
  // 5) query (columns)
  const columns = [];
  Object.keys(body).forEach((key, i) => {
    columns.push(`${key}=$${i + 1}`);
  });
  const query = `UPDATE fabrics SET ${columns.join(',')} WHERE name=$${
    columns.length + 1
  }`;
  // 6) update
  await db.query(query, query_values);
  // 7) send res
  res.status(201).json({
    status: 'success',
    data: {
      fabric: validated_values,
    },
  });
});

exports.delete_fabric_by_name = catchAsync(async (req, res, next) => {
  const { name } = req.params;
  const { rows, rowCount } = await db.query(
    'SELECT * FROM fabrics WHERE name=$1',
    [name]
  );

  if (rowCount !== 1) {
    return next(new AppError('No fabric found with that name.', 404));
  }

  await db.query('DELETE FROM fabrics WHERE name=$1', [name]);

  res.status(204).json({
    status: 'success',
  });
});

exports.get_product_with_the_same_fabric = catchAsync(
  async (req, res, next) => {
    // 1) get fabric name and check if it exist
    const { name } = req.params;
    const { rowCount } = await db.query('SELECT * FROM fabrics WHERE name=$1', [
      name,
    ]);
    if (rowCount !== 1) {
      return next(new AppError('No fabric found with that name.', 404));
    }
    // 2) select products
    const columns =
      'products.id,products.name,products.type,products.fabric,products.price,products.cut,products.collar,products.color,products.color_hex,products.small_size,products.medium_size,products.large_size,products.x_large_size,products.xx_large_size,products.image_cover,products.image_detail,products.slug';
    const { rows } = await db.query(
      `SELECT ${columns} FROM products WHERE fabric=$1`,
      [name]
    );
    // 3) send res
    res.status(200).json({
      status: 'success',
      result: rows.length,
      data: {
        products: rows,
      },
    });
  }
);
