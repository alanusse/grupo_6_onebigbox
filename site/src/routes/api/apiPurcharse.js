var express = require('express');
var router = express.Router();

const apiPurcharsesController = require('../../controller/api/apiPurcharsesController');


router.get('/getPurcharses', apiPurcharsesController.getPurcharses);
router.get('/getPurcharses/:userId', apiPurcharsesController.getPurcharsesByUserId);


module.exports = router;