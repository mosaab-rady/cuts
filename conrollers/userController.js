const db = require('../db/index');
const userSchema = require('../db/userSchema');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.get_all_users = catchAsync(async (req, res, next) => {
  const columns = `id, first_name , last_name, email, role, created_at`;
  const { rows, rowCount } = await db.query(`SELECT ${columns} FROM users`);

  res.status(200).json({
    status: 'success',
    result: rowCount,
    data: {
      users: rows,
    },
  });
});

exports.get_user_by_id = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const columns = `id,first_name,last_name,email,role,created_at`;
  const query = `SELECT ${columns} FROM users WHERE id=$1`;

  const { rows, rowCount } = await db.query(query, [id]);

  if (rowCount !== 1)
    return next(new AppError('No user found with that ID.', 404));

  res.status(200).json({
    status: 'success',
    data: {
      user: rows[0],
    },
  });
});

exports.create_new_user = catchAsync(async (req, res, next) => {
  // 1) get request data
  const { body } = req;
  // 2) validate request data
  const validated_values = await userSchema.validateAsync(body);
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

  const query = `INSERT INTO users (${columns.join(
    ','
  )}) VALUES (${columns_num.join(',')})`;
  // 5) insert into database
  await db.query(query, query_values);

  // 6) send res
  res.status(201).json({
    status: 'success',
    data: {
      user: validated_values,
    },
  });
});

exports.update_user_by_id = catchAsync(async (req, res, next) => {
  // 1) get user id
  const { id } = req.params;
  const { body } = req;
  // 2) check if user exist
  const { rows, rowCount } = await db.query(
    `SELECT first_name,last_name,email, password,role FROM users WHERE id=$1`,
    [id]
  );

  if (rowCount !== 1)
    return next(new AppError('No user found with that ID.', 404));
  // 3) validate new values
  const new_values = { ...rows[0], ...body };

  const validated_values = await userSchema.validateAsync(new_values);
  // 4) get array[query_values] from request body
  const query_values = Object.keys(body).map((key) => body[key]);
  query_values.push(id);
  // 5) get colummns and query string
  const columns = [];
  Object.keys(body).forEach((key, i) => {
    columns.push(`${key}=$${i + 1}`);
  });

  const query = `UPDATE users SET ${columns.join(',')} WHERE id=$${
    columns.length + 1
  }`;
  // 6) update record.
  await db.query(query, query_values);
  // 7) send res
  res.status(200).json({
    status: 'success',
    data: {
      user: validated_values,
    },
  });
});

exports.delete_user_by_id = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { rowCount } = await db.query(`SELECT * FROM users WHERE id=$1`, [id]);

  if (rowCount !== 1)
    return next(new AppError('No user found with that ID.', 404));

  await db.query(`DELETE FROM users WHERE id=$1`, [id]);

  res.status(204).json({
    status: 'success',
  });
});

//////////////////////////////////////
/////////////////////////////////
////////////////////////
////////////////
////////////

// const User = require('../models/userModel');
// const AppError = require('../utils/AppError');
// const catchAsync = require('../utils/catchAsync');

// exports.getAllUsers = catchAsync(async (req, res, next) => {
//   // 1) get all user
//   const users = await User.find();
//   // 2) send response
//   res.status(200).json({
//     status: 'success',
//     results: users.length,
//     data: {
//       users,
//     },
//   });
// });

// exports.createNewUser = catchAsync(async (req, res, next) => {
//   // 1) create the user
//   const user = await User.create(req.body);
//   // 2) send response
//   res.status(201).json({
//     status: 'success',
//     data: {
//       user,
//     },
//   });
// });

// exports.getUserById = catchAsync(async (req, res, next) => {
//   // 1) get the id
//   const { id } = req.params;
//   // 2) find the user
//   const user = await User.findById(id);
//   // 3) if the user does not exist send error
//   if (!user) {
//     return next(new AppError('No document found with that ID.', 404));
//   }
//   // 4) send response
//   res.status(200).json({
//     status: 'success',
//     data: {
//       user,
//     },
//   });
// });

// exports.updateUserById = catchAsync(async (req, res, next) => {
//   // 1) get the id
//   const { id } = req.params;
//   // 2) update the user
//   const user = await User.findByIdAndUpdate(id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   // 3) if the user does not exist send error
//   if (!user) return next(new AppError('No document found wwith that ID.', 404));
//   // 4) send response
//   res.status(200).json({
//     status: 'success',
//     data: {
//       user,
//     },
//   });
// });

// exports.deleteUserById = catchAsync(async (req, res, next) => {
//   // 1) get the id
//   const { id } = req.params;
//   // 2) delete the user
//   const user = await User.findByIdAndDelete(id);
//   // 3) if user does nott exist send error
//   if (!user) return next(new AppError('No document found with that ID.', 404));
//   // 4) send response
//   res.status(204).json({
//     status: 'success',
//   });
// });
