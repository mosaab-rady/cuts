const express = require('express');
const router = express.Router();

const cutsController = require('../conrollers/cutController');
const authController = require('../conrollers/authController');

router.use(authController.protect, authController.restrictTo('admin'));

router
  .route('/')
  .get(cutsController.get_all_cuts)
  .post(cutsController.create_new_cut);

router
  .route('/:cut')
  .get(cutsController.get_cut_by_name)
  .patch(cutsController.update_cut_by_name)
  .delete(cutsController.delete_cut_by_name);

module.exports = router;
