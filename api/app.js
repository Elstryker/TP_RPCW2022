var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var apiRouter = require('./routes/api');

var app = express();

var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/TP_RPCW2022'

mongoose.connect(mongoDB, {useNewURLParser: true, useUnifiedTopology: true});

var db = mongoose.connection

db.on('error', (err) => {
    console.log(err);
})
db.once('open', () => {
    console.log("Conexão ao MongoDB efetuada com sucesso!");
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

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
  console.log(err)
  res.jsonp({error: err});
});

module.exports = app;
