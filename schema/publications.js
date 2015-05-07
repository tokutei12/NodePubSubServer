var mongoose = require('mongoose');

var schema = mongoose.Schema({
	timestamp: {type: Date, default: Date.now},
	mobile_id: {type: String},
	message: {type: String},
	sensor_data: {} //mixed
});

var Publication = mongoose.model('Publication', schema);

module.exports = Publication;