var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//CORS
const cors = require('cors');
const session = require('express-session');
// Requiero el middleware a nivel aplicación para loguear siempre las rutas por donde pasa el usuario
//const userAudit = require('./middlewares/userAudit');
const  userSession = require('./middlewares/userSession');

// Creo las variables para los routes
var homeRouter = require('./routes/home');
var usersRouter = require('./routes/users');
var planesListRouter = require('./routes/planes');
var cartRouter = require('./routes/cart');
var recetasRouter = require('./routes/recetas');
var adminRouter = require('./routes/admin');

//Rutas para API
var apiAdminRouter = require('./routes/api/apiAdmin');
var apiUserRouter = require('./routes/api/apiUser');
var apiDashboard = require('./routes/api/apiDashboard.js');
var apiCart = require('./routes/api/apiCart');
var apiPurcharse = require('./routes/api/apiPurcharse');

var apiImage = require('./routes/api/apiImage');
//**** */

var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* ***** Middlewares ***** */
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public'))); 
//app.use(session({secret: "Mensaje Secreto"}));
app.use(session({ secret: "Mensaje Secreto", resave: false, saveUninitialized: true}));

//********** LOUEO **********
//app.use(userAudit);

// ** Middleware para la sessión **
app.use(userSession);

//********** ACCESO A LAS RUTAS **********
app.use('/', homeRouter);
app.use('/user', usersRouter);
app.use('/planes', planesListRouter);
app.use('/cart', cartRouter );
app.use('/recetas', recetasRouter);
app.use('/admin', adminRouter);


//Rutas de la API
app.use('/api/admin/user', apiAdminRouter);
app.use('/api/user', apiUserRouter);
app.use('/api/dashboard', apiDashboard);
app.use('/api/cart', apiCart);
app.use('/api/apiPurcharse', apiPurcharse);

app.use('/api/image', apiImage);

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
  let admin = req.headers.referer.includes('admin')
  res.status(err.status || 500);
  res.render('error', {admin});
  
});


module.exports = app;
