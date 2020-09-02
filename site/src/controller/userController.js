const { validationResult } = require ('express-validator');
const bcrypt = require('bcryptjs');
/* ******* CONSTANTES PARA TRABAJAR CON JSON *********** */


/* ******* CONSTANTES PARA TRABAJAR CON BASE DE DATOS *********** */
const db = require('../database/models');
/* ******* CONSTANTES PARA TRABAJAR CON BASE DE DATOS *********** */
 
//Enumerdado para los tipos de usuario
const rolUsuario = {
    USER: 0,
    ADMIN: 1
};

const controller ={
    register: (req, res) =>{
       return res.render('user/register');
    },
    
    registerPost : (req, res) => { 
        let errors = validationResult(req);
        if (errors.isEmpty()){
            
            db.Users.create({ 
                name : req.body.nombre,
                lastname : req.body.apellido,
                email : req.body.email,
                password : bcrypt.hashSync(req.body.password, 10),
                avatar:  (req.file)? req.file.filename : 'default.png',
                admin: rolUsuario.USER // USER: 0 o ADMIN:1 -->Por defecto, todos son 0 (USER)
            })
            .then(user =>{
                delete user.dataValues.password;
                req.session.user = user.dataValues;
                
                if (user.dataValues.admin){
                    req.session.admin = resultado.dataValues.admin;
                }

                return res.redirect('/');
            })
            .catch(err => console.log(err))
        } else {
            return res.render('user/register', { errors : errors.errors, old: req.body });
            //return res.render("user/register", { errors: errors.mapped(), old: req.body }); -> Como lo hizo Gonza
        }
    },

    login: (req, res) =>{
         return res.render('user/login');
    },
    loginIngresoDatos: (req, res) => {
        let errors = validationResult(req);
        
        if (errors.isEmpty()){

            db.Users.findOne({
                where: {email:req.body.email}
            })
            .then(function(resultado){
                //Borro la contraseña
                delete resultado.dataValues.password;
                req.session.user = resultado.dataValues;
                //eturn res.send(resultado.dataValues);
              
                if (req.body.checkRecordarme){
                    //Guardo en una cookie el usuario que se registró asi ya queda logueado en la aplicación. Tercer parámetro es el tiempo, lo establecido ahi es para que dure UN DIA
                    res.cookie('email', resultado.dataValues.email, {maxAge: 1000 * 60 * 60 * 24});
                }
                return res.redirect('/');
            })            
        }else{
            return res.render('user/login', { errors : errors.errors, old: req.body});
        }  
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