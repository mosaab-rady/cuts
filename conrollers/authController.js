const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt');

const createSendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '90d',
  });

  const cookieOptions = {
    expires: new Date(Date.now + 90 * 24 * 60 * 60 * 1000),
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
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  // 1) get the email and password
  const { email, password } = req.body;
  // 2) check if there are email and password
  if (!email || !password) {
    return next(new AppError('please provide email and password.', 400));
  }
  // 3) get the user from database
  const user = await User.findOne({ email }).select('+password');
  // 4) if no user or wrong password send error
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password.', 401));
  }
  // 5) send cookie
  createSendToken(user, 200, res);
});

exports.logout = (req, res, next) => {
  res.cookie('jwt_server', 'loggedout', {
    expires: new Date(Date.now() + 10000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
    data: 'logged out successfully',
  });
};
