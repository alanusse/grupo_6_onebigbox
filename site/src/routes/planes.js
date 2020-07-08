var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const planesController = require('../controller/planesController');

//Redirijo al controlador de planes
router.get('/', planesController.root);
router.get('/detail/:planid', planesController.detail);



module.exports = router;
