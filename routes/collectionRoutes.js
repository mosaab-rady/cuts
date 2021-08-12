const express = require('express');

const router = express.Router();

const collectionController = require('../conrollers/collectionController');

router
  .route('/')
  .get(collectionController.grtAllCollections)
  .post(collectionController.createNewCollection);

module.exports = router;
