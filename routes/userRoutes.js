const express = require('express');
const router = express.Router();

const userController = require('../conrollers/userController');
const authController = require('../conrollers/authController');
const reviewRoutes = require('./reviewRoutes');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.use(authController.protect);

router.use('/:userid/reviews', reviewRoutes);

router
  .route('/')
  .get(authController.restrictTo('admin'), userController.getAllUsers)
  .post(userController.createNewUser);

router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUserById)
  .delete(userController.deleteUserById);

module.exports = router;
