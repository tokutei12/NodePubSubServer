var mongoose = require('mongoose');

var schema = mongoose.Schema({
	username: {type: String, unique: true, required: true}
});

var Subscription = mongoose.model('Subscription', schema);

var checkLength = function(s) {
    if (s){
        return s.length > 0;
    } else {
        return false;
    }
};

Subscription.schema.path('username').validate(checkLength, "Username cannot be empty");

module.exports = Subscription;