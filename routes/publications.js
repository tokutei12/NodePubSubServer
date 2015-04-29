var express = require('express');
var router = express.Router();
var Publications = require('./../schema/publications');
var io = require('socket.io/node_modules/socket.io-client');
client = io.connect('http://localhost:3001');//TODO: remove hard coding

/* GET listing of pubs */

router.get('/', function(req, res) {
    Publications.find({}, function (err, pubs) {
        if (err) {
            res.status(500).json({ error: "Error finding publications", success: false });
        } else {
            res.render('publications', {
                'pubs': pubs
            });
        }
    });
});

router.post('/', function(req, res) {
    Publications.create(req.body, function(err, pub){
        if (err){
            res.json({error: 'Could not create new Publication', success: false});
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
