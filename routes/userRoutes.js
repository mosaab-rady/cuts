const express = require('express');
const router = express.Router();

const userController = require('../conrollers/userController');
const authController = require('../conrollers/authController');
const reviewRoutes = require('./reviewRoutes');

// router.post('/signup', authController.signup);
// router.post('/login', authController.login);
// router.get('/logout', authController.logout);
// router.get('/isloggedin', authController.isLoggedIn);

// router.use(authController.protect);

// router.use('/:userid/reviews', reviewRoutes);

// router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.get_all_users)
  .post(userController.create_new_user);

router
  .route('/:id')
  .get(userController.get_user_by_id)
  .patch(userController.update_user_by_id)
  .delete(userController.delete_user_by_id);

module.exports = router;
