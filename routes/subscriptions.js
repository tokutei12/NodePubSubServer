var express = require('express');
var router = express.Router();
var Subscriptions = require('./../schema/subscriptions');

/* GET listing of pubs */

router.get('/', function(req, res) {
    Subscriptions.find({}, function (err, subs) {
        if (err) {
            res.status(500).json({ error: "Error finding subscriptions", success: false });
        } else {
            res.render('subscriptions', {
                'subs': subs
            });
        }
    });
});

router.post('/', function(req, res) {
    Subscriptions.create(req.body, function(err){
        if (err){
            res.status(500).json({error: 'Could not create new Subscription', success: false});
        } else {
            Subscriptions.find({}, function (err, allsubs) {
                if (err) {
                    res.status(500).json({ error: "Error finding subscriptions", success: false });
                } else {
                    return res.render('../views/partials/subs_list', {layout: false, subs: allsubs});
                }
            });
        }
    });
});

router.get('/:username', function(req, res){
	var username = req.params.username
	Subscriptions.findOne({mobile_id: username}, function(err, user){
		if(err){
			res.status(500).json({ error: "Error finding subscription", success: false});
		}
		else if(!user){ //no result found
			res.status(404).json({ error: "No subscription with that username found", success: false});
		}
		else{
			res.render('ind_subscription', {username: user.mobile_id});
		}
	});
});

module.exports = router;