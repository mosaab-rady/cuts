const express = require('express');
const router = express.Router();

const fabricController = require('../conrollers/fabricController');

router
  .route('/')
  .get(fabricController.get_all_fabrics)
  .post(fabricController.create_new_fabric);

router
  .route('/:name')
  .get(fabricController.get_fabric_by_name)
  .patch(fabricController.update_fabric_by_name)
  .delete(fabricController.delete_fabric_by_name);

router
  .route('/:name/products')
  .get(fabricController.get_product_with_the_same_fabric);

module.exports = router;
