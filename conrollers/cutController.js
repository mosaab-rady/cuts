const db = require('../db');
const cutsShema = require('../db/cutsShema');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.get_all_cuts = catchAsync(async (req, res, next) => {
  const { rows, rowCount } = await db.query(`SELECT * FROM cuts `);
  res.status(200).json({
    status: 'success',
    result: rowCount,
    data: {
      cuts: rows,
    },
  });
});

exports.get_cut_by_name = catchAsync(async (req, res, next) => {
  const { cut } = req.params;
  const { rows, rowCount } = await db.query(`SELECT * FROM cuts WHERE cut=$1`, [
    cut,
  ]);

  if (rowCount !== 1)
    return next(new AppError('No cut found with that name.', 404));

  res.status(200).json({
    status: 'success',
    data: {
      cut: rows[0],
    },
  });
});

exports.create_new_cut = catchAsync(async (req, res, next) => {
  // 1) get body
  const { body } = req;
  // 2) validate using joi
  const validated_values = await cutsShema.validateAsync(body);
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
  const query = `INSERT INTO cuts (${columns.join(
    ','
  )}) VALUES (${columns_num.join(',')})`;
  // 5) insert into db
  await db.query(query, query_values);
  // 6) send res
  res.status(201).json({
    status: 'success',
    data: {
      cut: validated_values,
    },
  });
});

exports.update_cut_by_name = catchAsync(async (req, res, next) => {
  // 1) get the name
  const { cut } = req.params;
  // 2) get the updated data
  const { body } = req;
  // 3) get the record
  const { rows, rowCount } = await db.query('SELECT * FROM cuts WHERE cut=$1', [
    cut,
  ]);
  // 4) if the record does not exist
  if (rowCount !== 1) {
    return next(new AppError('No cut found with that name.', 404));
  }
  // 5) valdite the new values
  const newValues = { ...rows[0], ...body };
  const validated_values = await cutsShema.validateAsync(newValues, {
    allowUnknown: true,
  });

  // 3) update the record
  // make an array of the records that will be updated based on the values that came in the request body to use it in  db.query function
  const query_values = Object.keys(body).map((key) => body[key]);
  query_values.push(cut);

  const columns = [];
  Object.keys(body).forEach((key, i) => {
    columns.push(`${key}=$${i + 1}`);
  });

  const query = `UPDATE cuts SET ${columns.join(',')} WHERE cut=$${
    columns.length + 1
  }`;

  await db.query(query, query_values);

  // 4) send res
  res.status(200).json({
    status: 'success',
    data: {
      cut: validated_values,
    },
  });
});

exports.delete_cut_by_name = catchAsync(async (req, res, next) => {
  const { cut } = req.params;
  const { rowCount } = await db.query(`SELECT * FROM cuts WHERE cut=$1`, [cut]);
  if (rowCount !== 1)
    return next(new AppError(`No cut found with that name.`, 404));

  await db.query(`DELETE FROM cuts WHERE cut=$1`, [cut]);

  res.status(204).json({
    status: 'success',
  });
});
