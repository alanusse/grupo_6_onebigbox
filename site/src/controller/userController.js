const jsonModel = require('../models/jsonModel');
const usersModel = jsonModel('userDataBase');

const { validationResult, cookie } = require ('express-validator');
const bcrypt = require('bcryptjs');

const controller ={
    register: (req, res) =>{
       return res.render('user/register');
    },
    
    registerPost : (req, res) => {
    
        let errors = validationResult(req);
     
        if (errors.isEmpty()){
            
            // Creo el objeto Usuario
            let usuarionuevo = {
                id : "",
                nombre : req.body.nombre,
                apellido : req.body.apellido,
                email : req.body.email,
                password : bcrypt.hashSync(req.body.password, 10)
            }
            
            
            // Inserto en el array el nuevo usuario
            usersModel.guardarUno(usuarionuevo);
           
            //Guardo en una cookie el usuario que se registró asi ya queda logueado en la aplicación
            res.cookie('email', usuarionuevo.email);

            //Lo mando a la home con la session ya iniciada
            return res.redirect('/');
           
        }
        return res.render('user/register', { errors : errors.errors});
    },


    login: (req, res) =>{
         return res.render('user/login');
    },

    loginIngresoDatos: (req, res) => {
        let errors = validationResult(req);
        
        console.log(errors);

        if (errors.isEmpty()){
           
        }
        return res.render('user/login', { errors : errors.errors});
    }

};

module.exports = controller;