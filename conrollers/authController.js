const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const userShema = require('../db/userSchema');
const db = require('../db');
const Email = require('../utils/email');
// const sendEmail = require('../utils/email');

const createSendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '90d',
  });

  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  // send cookie
  res.cookie('jwt_server', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // 1) get user data
  const { first_name, last_name, email, password } = req.body;
  // 2) validate data
  const validated_values = await userShema.validateAsync({
    first_name,
    last_name,
    email,
    password,
  });
  // 3) encrypt password
  validated_values.password = await bcrypt.hash(validated_values.password, 12);
  // 4) insert into data
  // get query values
  const query_values = Object.keys(validated_values).map(
    (key) => validated_values[key]
  );

  // get columns columns_num
  const columns = [];
  const columns_num = [];
  Object.keys(validated_values).forEach((key, i) => {
    columns.push(key);
    columns_num.push(`$${i + 1}`);
  });

  const query = `INSERT INTO users (${columns.join(
    ','
  )}) VALUES (${columns_num.join(',')}) RETURNING *`;

  const { rows } = await db.query(query, query_values);

  // send welcome email
  await new Email({
    to: rows[0].email,
    first_name: rows[0].first_name,
  }).welcome();

  // await sendEmail({
  //   to: rows[0].email,
  //   subject: 'Welcome to cuts !!!',
  // });

  // 5) send token
  createSendToken(rows[0], 201, res);
  ///////////////////////
  // const newUser = await User.create({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  // });
  // createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  // 1) get the email and password
  const { email, password } = req.body;
  // 2) check if there are email and password
  if (!email || !password) {
    return next(new AppError('please provide email and password.', 400));
  }
  // 3) get the user from database
  const { rows } = await db.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  // const user = await User.findOne({ email }).select('+password');
  // 4) if no user or wrong password send error
  if (!rows[0] || !(await bcrypt.compare(password, rows[0].password))) {
    return next(new AppError('Incorrect email or password.', 401));
  }
  // 5) send cookie

  createSendToken(rows[0], 200, res);
});

exports.logout = (req, res, next) => {
  res.cookie('jwt_server', 'loggedout', {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
    data: 'logged out successfully.',
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) get the cookie
  const token = req.cookies.jwt_server;
  // 2) if no cookie send error
  if (!token)
    return next(
      new AppError('You are not logged in! please log in to get access.', 401)
    );
  // 3) verify the cookie
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // const decoded = jwt.verify(
  //   token,
  //   process.env.JWT_SECRET,
  //   function (err, decoded) {
  //     if (err) {
  //       return next(
  //         new AppError('something went wrong!! Please log in again.', 401)
  //       );
  //     } else return decoded;
  //   }
  // );

  // 4) check for the user
  const { rows } = await db.query(
    `SELECT id,first_name,last_name,email,role,created_at FROM users WHERE id=$1`,
    [decoded.id]
  );
  const currentUser = rows[0];
  // const currentUser = await User.findById(decoded.id);
  // 5) if no user send error
  if (!currentUser)
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  // 6) put the user in the req
  req.user = currentUser;
  // 7) allow access
  next();
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  // 1) check for the cookie
  const token = req.cookies.jwt_server;
  if (!token) return next();
  // 2) check if the cookie is valid
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET,
    function (err, decoded) {
      if (err) {
        return next(
          new AppError('something went wrong!! Please log in again.', 401)
        );
      }
      return decoded;
    }
  );
  // 3) find the user
  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  // 4) send the user
  res.status(200).json({
    status: 'success',
    data: {
      user: currentUser,
    },
  });
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    // roles [user,admin]
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action.', 403)
      );
    }
    next();
  };
