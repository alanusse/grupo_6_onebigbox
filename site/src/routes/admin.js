var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const adminController = require('../controller/adminController');

router.get('/', adminController.root);
router.get('/recetas', adminController.recetas);



module.exports = router;
