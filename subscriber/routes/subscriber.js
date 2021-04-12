const express = require('express');
const subscribecontroller = require('../controllers/subscribecontroller');

const router = express.Router();

//create subscription
router.route('/subscribe/:topic').post(subscribecontroller.createsubscription);

//test endpoints for recieving subscription
router.route('/test1').post(subscribecontroller.recievemessage);
router.route('/test2').post(subscribecontroller.recievemessage);

module.exports = router;