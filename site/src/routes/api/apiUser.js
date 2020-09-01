var express = require('express');
var router = express.Router();

var validator = require('../../middlewares/validator');
const apiUserController = require('../../controller/api/apiUserController');

router.get('/', apiUserController.getAllUsers);
router.get('/:id', apiUserController.getUserbyId);
router.post('/validatorRegister', validator.createUser, apiUserController.validatorRegister);
router.post('/validatorLogin', validator.login, apiUserController.validatorLogin);

module.exports = router;
