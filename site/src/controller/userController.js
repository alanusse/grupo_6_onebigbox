const fs = require('fs');
const path = require('path');
const { validatorResult } = require ('express-validator');


const controller ={
    register: (req, res) =>{
        
        return res.render('user/register');
    },
    login: (req, res) =>{
      
        return res.render('user/login');

    }
    
    /*,

    loginIngresoDatos: (req, res) => {
        let errors = validatorResult(req);
        console.log(errors);

        if (errors.isEmpty()){

            return res.render('user/login');

        }
        return res.send(errors.error);        
    }*/

};

module.exports = controller;