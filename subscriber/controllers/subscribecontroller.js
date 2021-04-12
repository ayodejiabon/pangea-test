const urlvalidator = require('valid-url');
const psl = require('psl');
const Subscriber = require('../models/subscribermodel');
const catchasync = require('../utils/catchasync');
const apperror = require('../utils/apperror');

//create subscription
exports.createsubscription = catchAsync (async (req, res, next) => {

	const url = req.body.url;
	const topic = req.params.topic;

	if (!url) {
		return next(new apperror('Please provide url', 400));
	}

	if (!urlvalidator.isUri(url)) {
		return next(new apperror('Please provide a valid url', 400));
	}

	if (psl.parse(url).input !== "http://localhost:9000/test1" && psl.parse(url).input !== "http://localhost:9000/test2") {
		return next(new apperror('Url domain must be http://localhost:9000/test1 or http://localhost:9000/test2 for test purposes', 400));
	}

	const result = await Subscriber.create({url,topic});

	res.status(200).json({url,topic});
});

//recieve published message
exports.recievemessage = catchAsync (async (req, res, next) => {

	console.log(req.body);

	res.status(200).json(req.body);
});
