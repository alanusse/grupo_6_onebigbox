var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const userController = require('../controller/userController');

//Redirijo al controlador de planes
router.get('/', userController.login); 
router.get('/register', userController.register);

module.exports = router;
