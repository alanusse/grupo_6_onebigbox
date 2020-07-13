var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const planesAbmController = require('../controller/planesAbmController');

//Redirijo al controlador de planes
router.get('/', planesAbmController.root);
router.get('/detail/:planid', planesAbmController.detail);



module.exports = router;
