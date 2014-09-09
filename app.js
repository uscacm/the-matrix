var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// MongoDB stuff
var MongoClient = require('mongodb').MongoClient;
var MongoServer = require('mongodb').Server;
var config = require('./config');
var UserDriver = require('./db/user_driver.js').UserDriver;
var EventDriver = require('./db/event_driver.js').EventDriver;

var routes = require('./routes/index');
var users = require('./routes/users');
var events = require('./routes/events');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var db;
var user_driver;
var event_driver;
var mongoClient = new MongoClient(new MongoServer(config.host, config.port));
mongoClient.open(function(err, mongoClient) {
  if (!mongoClient) {
    console.error('Error (Exiting): Must start MongoDB first.');
    process.exit(1);
  }
  db = mongoClient.db(config.db_name);
  user_driver = new UserDriver(db);
  event_driver = new EventDriver(db);
});

// Make db accessible to router.
app.use(function(req, res, next) {
  req.db = db;
  req.user_driver = user_driver;
  req.event_driver = event_driver;
  next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/events', events);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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
