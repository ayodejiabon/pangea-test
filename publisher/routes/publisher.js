const express = require('express');
const publishcontroller = require('../controllers/publishcontroller');

const router = express.Router();

router.route('/:topic').post(publishcontroller.publishtopic);

module.exports = router;