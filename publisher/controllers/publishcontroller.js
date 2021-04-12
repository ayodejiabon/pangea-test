const urlvalidator = require('valid-url');
const axios = require('axios');
const Publisher = require('../models/publishermodel');
const Subscriber = require('../models/subscribermodel');
const catchasync = require('../utils/catchasync');
const apperror = require('../utils/apperror');


//publish topic
exports.publishtopic = catchAsync (async (req, res, next) => {

	const body = req.body;
	const topic = req.params.topic;

	if (typeof body !== 'object' || body === null || Object.getOwnPropertyNames(req.body).length == 0){
		return next(new apperror('Invalid data submitted', 400));
	}

	const query = await Subscriber.find({topic:topic});

	//send message to subscribers
	if (query) {
		const result = Promise.all(query.forEach(function(entry, i) {
			axios.post(entry.url, {
				topic:topic,
			    data:req.body
		  	})
		  	.then(function (response) {})
		  	.catch(function (error) {});
		}));
	}

	res.status(200).json({status:'success'});
});
