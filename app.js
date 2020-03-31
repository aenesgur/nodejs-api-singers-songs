const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const songsRouter = require('./routes/song');
const singersRouter = require('./routes/singer');

const app = express();

//database connection
const dbConnection = require('./helper/data-access-layer/databaseConnection')();

//config for api-secret-key
const configKey = require('./config');
app.set('api_secret_key',configKey.api_secret_key);

//middleware
const verifyToken = require('./helper/middleware/verif-token');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/',verifyToken);
app.use('/api/songs', songsRouter);
app.use('/api/singers', singersRouter);

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
  res.json({error:{message:err.message,code:err.code}});
});

module.exports = app;
