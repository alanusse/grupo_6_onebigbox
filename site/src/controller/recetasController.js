/* ******* CONSTANTES PARA TRABAJAR CON BASE DE DATOS *********** */
const db = require('../database/models');
/* ******* CONSTANTES PARA TRABAJAR CON BASE DE DATOS *********** */


const controller ={
    root: (req, res) => {
        // Consulto las recetas en la base de datos
         db.Recipes.findAll()
            .then((recetas) => {
                // Redirecciono a la vista con las recetas que haya encontrado en la base
                return res.render('recetas-list', {recetas});
            })
            .catch(reason => {
                console.log(reason);
            });
    },

    detail:(req, res) => {
        db.Recipes.findByPk(req.params.recetaId)
            .then((receta) =>{
                return res.render('receta-detail', {receta});
            })
            .catch ((reason) => {
                console.log(reason);
            })        
    }
};
module.exports = controller;