const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
	topic: String,
	data: {
		type:Object
	},
	created: {
		type: Date,
		default: Date.now()
	}
}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
});

publisherSchema.pre('save', function(next) {
	this.slug = slugify(this.topic, {lower: true});
	next();
});

const Subscriber = mongoose.model("publisher", publisherSchema);

module.exports = Subscriber;