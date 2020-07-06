const jsonModel = require('../models/jsonModel');
const usersModel = jsonModel('userDataBase');
const { validationResult, cookie, body } = require ('express-validator');
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
                id : '', 
                nombre : req.body.nombre,
                apellido : req.body.apellido,
                email : req.body.email,
                password : bcrypt.hashSync(req.body.password, 10),
                avatar:  (req.file)? req.file.filename : 'default.png'
            }
            // Inserto en el array el nuevo usuario
            usersModel.guardarUno(usuarionuevo);
           
            //Guardo en una cookie el usuario que se registró asi ya queda logueado en la aplicación
            // Pero acá debería haber una variable de sessión, no de cookie
            res.cookie('email', usuarionuevo.email, {maxAge: 60 * 60 * 24});
           
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
        
        //Si no hay errores, quiere decir que encontró al usuario en la BD
        if (errors.isEmpty()){
            
            if (req.body.checkRecordarme){
                //Guardo en una cookie el usuario que se registró asi ya queda logueado en la aplicación
                res.cookie('email', usuarionuevo.email, {maxAge: 60 * 60 * 24});
            }
        }
        return res.render('user/login', { errors : errors.errors});
    }

};

module.exports = controller;