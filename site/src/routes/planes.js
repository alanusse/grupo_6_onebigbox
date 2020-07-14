var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const planesController = require('../controller/planesController');

//Redirijo al controlador de planes
router.get('/', planesController.root);
router.get('/detail/:planid', planesController.detail);
// router.get('/plan-personalizado', planesController.listAllRecipes);

// Esto fue una prueba para la conexión a la BD
//router.get('/planesDB', planesController.buscarplanDB); 



module.exports = router;
