var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var multer=require('multer');
var upload =multer({dest: 'uploads/'});
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var admin = require('./routes/admin');

// connection to database made
var connection = require('./config/db').connection;

var app = express();
//var nodeadmin = require('nodeadmin');
//app.use(nodeadmin(app))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat',resave: true,
    saveUninitialized: true}))
app.use(express.static(path.join(__dirname, '/public')));
app.use('/admin', express.static(path.join(__dirname + '/public')));

app.use('/', routes);
app.use('/admin', admin);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
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
