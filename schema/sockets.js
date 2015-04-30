var mongoose = require('mongoose');

var schema = mongoose.Schema({
	socket_id: {type: String, required: true},
	subscriber: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' }
});

var Socket = mongoose.model('Socket', schema);

module.exports = Socket;