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
        
        let ingredientes = receta.ingredientes.split('|');
        let pasos = receta.pasos.split('|');

        console.log(ingredientes);
        console.log(pasos);
        
        /* Para validar si tiene contenido la variable
        if (receta){
            console.log('Tiene receta');
        }else{
            console.log('No tiene receta')
        }
        */
        return res.render('receta-detail', {receta, ingredientes, pasos});
    }
};
module.exports = controller;