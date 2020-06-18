const fs = require('fs');
const path = require('path');

const controller ={
    register: (req, res) =>{
        console.log('REGISTER');
        return res.render('user/register');
    },
    login: (req, res) =>{
        console.log('pasó por acá');
        return res.render('user/login');
    }

};

module.exports = controller;