var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

/* ***** Middlewares requires ***** */
const userLogs = require('./middlewares/userlogs'); // Middleware para logs de rutas visitadas
const userSession = require('./middlewares/userSession'); // Middleware para guardar una cookie en sesión de usuario

// Creo las variables para los routes
var homeRouter = require('./routes/home');
var usersRouter = require('./routes/users');
var planesListRouter = require('./routes/planes');
var cartRouter = require('./routes/cart');
var recetasRouter = require('./routes/recetas');

var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* ***** Middlewares ***** */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public'))); 
app.use(session({secret: "Mensaje Secreto"}));

app.use(userLogs); // Middleware para logs de rutas visitadas
app.use(userSession); // Middleware para guardar una cookie en sesión de usuario

//********** ACCESO A LAS RUTAS **********
app.use('/', homeRouter);
app.use('/user', usersRouter);
app.use('/planes', planesListRouter);
app.use('/cart', cartRouter );
app.use('/recetas', recetasRouter);

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
