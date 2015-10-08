var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var lastState = -1;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// really bad way to do this because it's past 5AM
app.get('/reset', function(req, res) {
	lastState = -1;
	res.send();
});
app.get('/0', function(req, res) {
	lastState = 0;
	res.send();
});
app.get('/1', function(req, res) {
	lastState = 1;
	res.send();
});
app.get('/2', function(req, res) {
	lastState = 2;
	res.send();
});

app.get('/text', function(req, res) {
	var textArray = ["Don't forget to take your medicine!", "Ben is approaching the beacon", "Ben is leaving the building"];
	if (lastState == -1) {
		res.send('Waiting for message...');
	} else {
		res.send(textArray[lastState]);
	}
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
