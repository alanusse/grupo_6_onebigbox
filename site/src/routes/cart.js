var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const cartController = require('../controller/cartController');
const { route } = require('./api/apiCart');

//Redirijo al controlador de planes
router.get('/', cartController.root);
router.post('/agregarAlCarrito/:planid', cartController.agregarAlCarrito);
router.post('/addRecipe/:id', cartController.addRecipe);

router.post('/deleteCart', cartController.deleteAllCart);
router.post('/deleteCartById', cartController.deleteCartById);

router.post('/shop', cartController.shop);
// Router para el historial de compras
router.get('/history', cartController.history);
router.get('/history/:userId', cartController.historyByUser);


module.exports = router;
