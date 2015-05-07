var express = require('express');
var router = express.Router();
var Publications = require('./../schema/publications');
var Sockets = require('./../schema/sockets');
var Subscriptions = require('./../schema/subscriptions');
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
    console.log(req.body);
    Publications.create(req.body, function(err, pub){
        if (err){
            res.json({error: 'Could not create new Publication', success: false});
        } else {
            //Find matching subscriptions
            Subscriptions.find({}, function(err, subs){
                if(err){
                    throw new Error(err);
                }
                //Emit message to connected subscriber sockets
                else{
                    //iterate over each subscription
                    subs.forEach(function(s){
                        //find if pub matches sub
                        var obj3 = {};
                        for (var attrname in s.matches) { obj3[attrname] = s.matches[attrname]; }
                        obj3['_id'] = pub._id;
                        console.log(obj3);
                        Publications.find(obj3, function(err, p){
                            Sockets.findOne({subscriber: s._id}, function(err, sock){//TODO: error handling if subscriber non-existent
                                if(err){
                                    throw new Error(err);
                                }
                                else if(sock !== null){
                                    //check for undefined socket, remove if so
                                    if(!global.io.sockets.connected[sock.socket_id]){
                                        Sockets.find({socket_id: sock.socket_id}).remove().exec();
                                    }
                                    else{
                                        global.io.sockets.connected[sock.socket_id].emit("message",pub.message);
                                    }
                                }
                            });
                        });
                    });
                }
            });
            // Subscriptions.find({matches:{req.body}}, function(err, subs){
            //     if(err){
            //         throw new Error(err);
            //     }
            //     //Emit message to connected subscriber sockets
            //     else{
            //         subs.forEach(function(s){
            //             Sockets.findOne({subscriber: s._id}, function(err, sock){//TODO: error handling if subscriber non-existent
            //                 if(err){
            //                     throw new Error(err);
            //                 }
            //                 else if(sock !== null){
            //                     //check for undefined socket, remove if so
            //                     if(!global.io.sockets.connected[sock.socket_id]){
            //                         Sockets.find({socket_id: sock.socket_id}).remove().exec();
            //                     }
            //                     else{
            //                         global.io.sockets.connected[sock.socket_id].emit("message",pub.message);
            //                     }
            //                 }
            //             });
            //         });
            //     }
            // });
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
