const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
// 1)create schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

// hash the password
userSchema.pre('save', async function (next) {
  // run this function only if the password is modified
  if (!this.isModified('password')) return next();

  // hash the password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// 2) create model
const User = mongoose.model('User', userSchema);

module.exports = User;
