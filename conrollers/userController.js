const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  // 1) get all user
  const users = await User.find();
  // 2) send response
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createNewUser = catchAsync(async (req, res, next) => {
  // 1) create the user
  const user = await User.create(req.body);
  // 2) send response
  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  // 1) get the id
  const { id } = req.params;
  // 2) find the user
  const user = await User.findById(id);
  // 3) if the user does not exist send error
  if (!user) {
    return next(new AppError('No document found with that ID.', 404));
  }
  // 4) send response
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUserById = catchAsync(async (req, res, next) => {
  // 1) get the id
  const { id } = req.params;
  // 2) update the user
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  // 3) if the user does not exist send error
  if (!user) return next(new AppError('No document found wwith that ID.', 404));
  // 4) send response
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteUserById = catchAsync(async (req, res, next) => {
  // 1) get the id
  const { id } = req.params;
  // 2) delete the user
  const user = await User.findByIdAndDelete(id);
  // 3) if user does nott exist send error
  if (!user) return next(new AppError('No document found with that ID.', 404));
  // 4) send response
  res.status(204).json({
    status: 'success',
  });
});
