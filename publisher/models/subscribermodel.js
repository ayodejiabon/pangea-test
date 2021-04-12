const mongoose = require('mongoose');
const slugify = require('slugify');

const subscriberSchema = new mongoose.Schema({
	url: String,
	topic: String,
	slug: String,
	created: {
		type: Date,
		default: Date.now()
	}
}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
});

subscriberSchema.pre('save', function(next) {
	this.slug = slugify(this.topic, {lower: true});
	next();
});

const Subscriber = mongoose.model("subscriptions", subscriberSchema);

module.exports = Subscriber;