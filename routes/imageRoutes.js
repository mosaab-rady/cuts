const express = require('express');

const router = express.Router();

const fileController = require('../conrollers/fileController');

router.route('/:filename').get(fileController.getImage);

module.exports = router;
