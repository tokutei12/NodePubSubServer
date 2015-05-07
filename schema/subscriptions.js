var mongoose = require('mongoose');

var schema = mongoose.Schema({
	timestamp: {type: Date, default: Date.now},
	mobile_id: {type: String},
	message: {},//mixed
	matches: {} //mixed
});

var Subscription = mongoose.model('Subscription', schema);

module.exports = Subscription;