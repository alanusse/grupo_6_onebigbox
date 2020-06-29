var express = require('express');
var router = express.Router();
const {body} = require('express-validator');

// ************ Controller Require ************
const userController = require('../controller/userController');

//Redirijo al controlador para todos los métodos del usuario
/*
router.get('/', [
    body('email')
        .notEmpty()
        .withMessage('El campo email es obligatorio'),
    body('email')
        .notEmpty()
        .withMessage('El campo nombre es obligatorio')
],userController.login); 
*/
router.get('/', userController.login);
router.post('/', userController.login);
router.get('/register', userController.register);
router.post('/register', userController.register);


module.exports = router;
