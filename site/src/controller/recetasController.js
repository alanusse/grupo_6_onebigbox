const jsonModel = require('../models/jsonModel');
const recetasModel = jsonModel('recetasDataBase');


const controller ={
    root: (req, res) => {
     
        let recetas =recetasModel.leerJson();   
        return res.render('recetas-list', {recetas});
    },
};
module.exports = controller;