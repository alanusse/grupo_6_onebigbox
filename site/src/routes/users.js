var express = require('express');
var router = express.Router();



// ************ Controller Require ************
const userController = require('../controller/userController');


// ************ Middlewares ************
const validator = require('../middlewares/validator');

//Redirijo al controlador para todos los métodos del usuario

//  Routeador del login
router.get('/', userController.login);
router.post('/', validator.login ,userController.loginIngresoDatos); 


// Routeador del Register
router.get('/register', userController.register);
router.post('/register',validator.register ,userController.registerPost); 


module.exports = router;
