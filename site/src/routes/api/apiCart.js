var express = require('express');
var router = express.Router();

const apiCartController = require('../../controller/api/apiItemController');


router.post('/deleteCartByUserId', apiCartController.deleteCartByUserId);
router.post('/deleteCartByItemId', apiCartController.deleteCartByItemId);

router.post('/updateCartById', apiCartController.updateCartById);

module.exports = router;