var express = require('express');
var router = express.Router();
var Sockets = require('./../schema/sockets');

/* Register socket w/ subscriber */  //TODO: fix and finish (move from app.js to here?)
router.post('/', function(req, res) {
    Sockets.create(req.body, function(err, pub){
        if (err){
            res.json({error: 'Could not register socket', success: false});
        } else {
            //Emit new pub
            client.emit("message",pub.message);
            //return new html for publications page partial
            Publications.find({}, function (err, allpubs) {
                if (err) {
                    res.status(500).json({ error: "Error finding publications", success: false });
                } else {
                    return res.render('../views/partials/pubs_list', {layout: false, pubs: allpubs});
                }
            });
        }
    });
});

module.exports = router;
