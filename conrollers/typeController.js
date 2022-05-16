const db = require('../db');
const typesShema = require('../db/typesSchema');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.get_all_types = catchAsync(async (req, res, next) => {
  const { rows, rowCount } = await db.query(`SELECT * FROM types `);
  res.status(200).json({
    status: 'success',
    result: rowCount,
    data: {
      types: rows,
    },
  });
});

exports.get_type_by_name = catchAsync(async (req, res, next) => {
  const { type } = req.params;
  const { rows, rowCount } = await db.query(
    `SELECT * FROM types WHERE type=$1`,
    [type]
  );

  if (rowCount !== 1)
    return next(new AppError('No type found with that name.', 404));

  res.status(200).json({
    status: 'success',
    data: {
      type: rows[0],
    },
  });
});

exports.create_new_type = catchAsync(async (req, res, next) => {
  // 1) get body
  const { body } = req;
  // 2) validate using joi
  const validated_values = await typesShema.validateAsync(body);
  // 3) get array[query_values]
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
  const query = `INSERT INTO types (${columns.join(
    ','
  )}) VALUES (${columns_num.join(',')})`;
  // 5) insert into db
  await db.query(query, query_values);
  // 6) send res
  res.status(201).json({
    status: 'success',
    data: {
      type: validated_values,
    },
  });
});

exports.update_type_by_name = catchAsync(async (req, res, next) => {
  // 1) get the name
  const { type } = req.params;
  // 2) get the updated data
  const { body } = req;
  // 3) get the record
  const { rows, rowCount } = await db.query(
    'SELECT * FROM types WHERE type=$1',
    [type]
  );
  // 4) if the record does not exist
  if (rowCount !== 1) {
    return next(new AppError('No type found with that name.', 404));
  }
  // 5) valdite the new values
  const newValues = { ...rows[0], ...body };
  const validated_values = await typesShema.validateAsync(newValues, {
    allowUnknown: true,
  });

  // 3) update the record
  // make an array of the records that will be updated based on the values that came in the request body to use it in  db.query function
  const query_values = Object.keys(body).map((key) => body[key]);
  query_values.push(type);

  const columns = [];
  Object.keys(body).forEach((key, i) => {
    columns.push(`${key}=$${i + 1}`);
  });

  const query = `UPDATE types SET ${columns.join(',')} WHERE type=$${
    columns.length + 1
  }`;

  await db.query(query, query_values);

  // 4) send res
  res.status(200).json({
    status: 'success',
    data: {
      type: validated_values,
    },
  });
});

exports.delete_type_by_name = catchAsync(async (req, res, next) => {
  const { type } = req.params;
  const { rowCount } = await db.query(`SELECT * FROM types WHERE type=$1`, [
    type,
  ]);
  if (rowCount !== 1)
    return next(new AppError(`No type found with that name.`, 404));

  await db.query(`DELETE FROM types WHERE type=$1`, [type]);

  res.status(204).json({
    status: 'success',
  });
});
