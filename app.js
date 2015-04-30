var express = require('express');
var engine = require('ejs-locals');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var publications = require('./routes/publications');
var subscriptions = require('./routes/subscriptions');

var app = express();
var server = app.listen(3001);
var io = require('socket.io').listen(server);

var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pubsub');
var db = mongoose.connection;

db.on('error', function(msg){
    console.log('Mongoose connection error %s', msg);
});

db.once('open', function(){
    console.log('Mongoose connection established');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/publications', publications);
app.use('/subscriptions', subscriptions);


// Socket IO code
var Subscriptions = require('./schema/subscriptions');
var Sockets = require('./schema/sockets');

io.on('connection', function(socket){
  console.log('a subscriber connected');
  socket.on('message', function(msg){
    io.emit('message', msg);
  });

  socket.on('registerSelf', function(username){
    console.log(username);
    console.log(socket.id);
    //get subscriber
    Subscriptions.findOne({username: username}, function(err, sub){
        if(err){
            throw new Error(err);
        }
        else{
            Sockets.create({socket_id: socket.id, subscriber: sub._id}, function(err, pub){
                if (err){
                    throw new Error(err);
                } 
            });
        }
    });
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
