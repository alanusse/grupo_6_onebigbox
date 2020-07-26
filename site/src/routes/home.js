var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const homeController = require('../controller/homeController');

router.get('/', homeController.root); /* GET - home page */
router.get('/howtouse/', homeController.howtouse);
router.get('/nosotros', homeController.nosotros);
router.get('/prueba', homeController.prueba);

module.exports = router;
