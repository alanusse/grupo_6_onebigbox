/* ******* CONSTANTES PARA TRABAJAR CON JSON *********** */
const jsonModel = require('../models/jsonModel');
const recetasModel = jsonModel('recetasDataBase');
/* ******* CONSTANTES PARA TRABAJAR CON JSON *********** */

/* ******* CONSTANTES PARA TRABAJAR CON BASE DE DATOS *********** */
const db = require('../database/models');
/* ******* CONSTANTES PARA TRABAJAR CON BASE DE DATOS *********** */


const controller ={
    root: (req, res) => {
         /* **** CODIGO PARA JSON *****
        let recetas =recetasModel.leerJson();   
        return res.render('recetas-list', {recetas});
         **** CODIGO PARA JSON ******/

         // Consulto las recetas en la base de datos
         db.recipes.findAll()
            .then((recetas) => {
                // Redirecciono a la vista con las recetas que haya encontrado en la base
                return res.render('recetas-list', {recetas});
            })
            .catch(reason => {
                console.log(reason);
            });
    },

    detail:(req, res) => {
        /* **** CODIGO PARA JSON *****
        //Buscar el ID de la receta que viene por parámeto
        let receta = recetasModel.findById(req.params.recetaId);
        return res.render('receta-detail', {receta});
         **** CODIGO PARA JSON ***** */

        db.recipes.findByPk(req.params.recetaId)
            .then((receta) =>{
                return res.render('receta-detail', {receta});
            })
            .catch ((reason) => {
                console.log(reason);
            })        
    }
};
module.exports = controller;