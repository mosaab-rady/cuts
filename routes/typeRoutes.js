const express = require('express');
const router = express.Router();

const typesController = require('../conrollers/typeController');

router
  .route('/')
  .get(typesController.get_all_types)
  .post(typesController.create_new_type);

router
  .route('/:type')
  .get(typesController.get_type_by_name)
  .patch(typesController.update_type_by_name)
  .delete(typesController.delete_type_by_name);

module.exports = router;
