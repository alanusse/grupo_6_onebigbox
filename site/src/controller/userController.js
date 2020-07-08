const jsonModel = require('../models/jsonModel');
const usersModel = jsonModel('userDataBase');
const { validationResult } = require ('express-validator');
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
            //Guardo los datos del usuario en sesión
            req.session.user = usuarionuevo;

           
           //Lo mando a la home con la session ya iniciada
            return res.redirect('/');
        } else {
            return res.render('user/register', { errors : errors.errors });
        }
    },

    login: (req, res) =>{
         return res.render('user/login');
    },

    loginIngresoDatos: (req, res) => {
        let errors = validationResult(req);
        
        //Si no hay errores, quiere decir que encontró al usuario en la BD
        if (errors.isEmpty()){
            // Si no hay errores quiere decir que puedo buscar al usuario en la BD
            let user = usersModel.findBySomething(user=>  user.email == req.body.email);

            //Borro la contraseña por seguridad
            delete user.password;

            req.session.user = user;

            if (req.body.checkRecordarme){
                //Guardo en una cookie el usuario que se registró asi ya queda logueado en la aplicación. Tercer parámetro es el tiempo, lo establecido ahi es para que dure UN DIA
                res.cookie('email', user.email, {maxAge: 1000 * 60 * 60 * 24});
            }
            return res.redirect('/');
        }
        return res.render('user/login', { errors : errors.errors});
    },

    logout: (req, res) =>{
        // Deslogueo al usuario, borrando la session
        req.session.destroy();
        
        //y borro la cookie si existe
        if (req.cookies.email){
            res.clearCookie('email');
        }
        return res.redirect('/');
    } 

};

module.exports = controller;