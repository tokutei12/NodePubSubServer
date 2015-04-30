var mongoose = require('mongoose');

var schema = mongoose.Schema({
	message: {type: String, required: true},
	channels: [String]
});

var Publication = mongoose.model('Publication', schema);

var checkLength = function(s) {
    if (s){
        return s.length > 0;
    } else {
        return false;
    }
};

Publication.schema.path('message').validate(checkLength, "Message cannot be empty");

module.exports = Publication;