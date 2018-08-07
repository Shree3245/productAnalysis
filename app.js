var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var foundersRouter = require('./routes/founders');
var sentimentAnalyzerRouter = require('./routes/sentiment-analyzer');
var dashboardRouter = require("./routes/dashboard");
var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyC67YlaL3PDKvlW7-GOX4t2K-5HvgrjanQ",
  authDomain: "jasa-project-foundry.firebaseapp.com",
  databaseURL: "https://jasa-project-foundry.firebaseio.com",
  projectId: "jasa-project-foundry",
  storageBucket: "jasa-project-foundry.appspot.com",
  messagingSenderId: "373535287386"
};
firebase.initializeApp(config);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/founders', foundersRouter);
app.use('/sentiment-analyzer', sentimentAnalyzerRouter);
app.use('/dashboard', dashboardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;