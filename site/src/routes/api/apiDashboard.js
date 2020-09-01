var express = require('express');
var router = express.Router();

const apiDashboardController = require('../../controller/api/dashboard/apiDashboardController');

router.get('/getStadistics', apiDashboardController.getDashboardStadistics);
router.get('/getCategories', apiDashboardController.getDashboardCategories);
router.get('/getLastProducts', apiDashboardController.getLastProducts);

module.exports = router;