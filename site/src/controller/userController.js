const fs = require('fs');
const path = require('path');

const controller ={
    register: (req, res) =>{
    
        return res.render('register');
    } 

};

module.exports = controller;