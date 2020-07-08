const jsonModel = require('../models/jsonModel');
const recetasModel = jsonModel('recetasDataBase');


const controller ={
    root: (req, res) => {
     
        let recetas =recetasModel.leerJson();   
        return res.render('recetas-list', {recetas});
    },

    detail:(req, res) => {
        
        //Buscar el ID de la receta que viene por parámeto
        let receta = recetasModel.findById(req.params.recetaId);
        
        console.log(receta);
        console.log(receta.length);

        return res.render('receta-detail', {receta});
    }
};
module.exports = controller;