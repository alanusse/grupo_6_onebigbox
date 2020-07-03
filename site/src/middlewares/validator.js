const bcrypt = require('bcryptjs')
const {body} = require('express-validator');

//Llamo al modelo de Usuarios para validarlo en el LOGIN
const jsonModel = require('../models/jsonModel');
const usersModel = jsonModel('userDataBase');

module.exports = {
    register: [
        body('nombre')
            .notEmpty()
            .withMessage('El campo nombre es obligatorio')
            .bail()
            .isLength( { min:4})
            .withMessage('El nombre debe tener un mínimo de 4 caracteres'),
        body('apellido')
            .notEmpty()
            .withMessage('El campo apellido es obligatorio')
            .bail()
            .isLength( { min:4})
            .withMessage('El Apellido debe tener un mínimo de 4 caracteres'),
        body('email')
            .notEmpty()
            .withMessage('El campo email es obligatorio')
            .bail()
            .isEmail()
            .withMessage('El mail del usuario debe tener formato de eMail'),
        body('password')
            .notEmpty()
            .withMessage('El campo password es obligatorio')
            .bail()
            .isLength( { min:4, max:10})
            .withMessage('La contraseña debe tener un mínimo de 4 y un máximo de 10 caracteres'),
    ],
    login: [
        body('email')
            .notEmpty()
            .withMessage('El campo email es obligatorio').bail()
            .custom(function(value, {req}){
                let users = usersModel.leerJson();
                //Código para validar mail y contraseña
    
                const user = users.find(function(user) {
                    return user.email == value
                })
                if(user){
                    // seguimos preguntando
                    return bcrypt.compareSync(req.body.password, user.password);
                } else {
                    return false
                }
            })
            .withMessage('Email y contrasenia no coinciden'),
        body('password')
            .notEmpty()
            .withMessage('El campo password es obligatorio')
    ]
}