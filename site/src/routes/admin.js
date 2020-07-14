var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const adminController = require('../controller/adminController');

//Redirijo al controlador de planes
router.get('/', adminController.root);
router.get('/detail/:planid', adminController.detail);



module.exports = router;
