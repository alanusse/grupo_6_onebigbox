var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const cartController = require('../controller/cartController');

//Redirijo al controlador de planes
router.get('/', cartController.root); 

module.exports = router;
