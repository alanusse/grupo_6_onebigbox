var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const recetasController = require('../controller/recetasController');

//Redirijo al controlador de planes
router.get('/', recetasController.root);
router.get('/detail/:recetaId', recetasController.detail);


module.exports = router;
