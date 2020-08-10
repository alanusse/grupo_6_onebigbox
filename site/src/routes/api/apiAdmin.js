var express = require('express');
var router = express.Router();

var validator = require('../../middlewares/validator');
const apiAdminController = require('../../controller/api/apiAdminController');

router.get('/', apiAdminController.getAllUsers);
router.get('/:id', apiAdminController.getUserbyId);
router.post('/validatorCreate', validator.createUser, apiAdminController.validatorCreate);
router.post('/validatorUpdate', validator.updateUser, apiAdminController.validatorUpdate);

module.exports = router;