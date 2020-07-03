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
            
            //Leo el Json de los usuarios para obtener el ultimo ID
            let usuarios = usersModel.leerJson();
            //Me posiciono en el ultimo registro del array de usuarios, tomo el id que tiene ese registro y le sumo 1
            let nuevoid = usuarios[usuarios.length - 1].id + 1;

            // Creo el objeto Usuario
            let usuarionuevo = {
                id : nuevoid, 
                nombre : req.body.nombre,
                apellido : req.body.apellido,
                email : req.body.email,
                password : bcrypt.hashSync(req.body.password, 10),
                avatar: req.file.filename
            }
            // Inserto en el array el nuevo usuario
            usersModel.guardarUno(usuarionuevo);
           
            //Guardo en una cookie el usuaquirio que se registró asi ya queda logueado en la aplicación
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
        
        //Si no hay errores, quiere decir que encontró al usuario en la BD
        if (errors.isEmpty()){
            
            //Pregunto si check está checkeado para guardarme la cookie
            if (req.body.checkRecordarme == 'on'){
                //Guardo en la cookie los datos del usuairo
                res.cookie('email', req.body.email);
            } 
        }
        return res.render('user/login', { errors : errors.errors});
    }

};

module.exports = controller;