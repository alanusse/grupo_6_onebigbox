/* ******* CONSTANTES PARA TRABAJAR CON JSON *********** */
const jsonModel = require('../models/jsonModel');
const planesModel = jsonModel('planesDataBase');
const instructivoModel = jsonModel('instructionsDataBase');
const recetasModel = jsonModel('recetasDataBase');
/* ******* CONSTANTES PARA TRABAJAR CON JSON *********** */

/* ******* CONSTANTES PARA TRABAJAR CON BASE DE DATOS *********** */
const db = require('../database/models');
/* ******* CONSTANTES PARA TRABAJAR CON BASE DE DATOS *********** */

// Creo el enumerado para no manejarme con datos fijos en el código
const planes = {
    PLAN_FAMILIAR: 1,
    PLAN_EQUILIBRADO: 2,
    PLAN_VEGETARIANO: 3,
    PLAN_PERSONALIZADO: 4
}

const controller ={
    root: (req, res) => {
       
       /* **** CODIGO PARA JSON *****
        // Leo los JSON de Planes e Instructivo para mostrarlo por pantalla
       let planes = planesModel.leerJson();
       let instructive = instructivoModel.leerJson();
       return res.render('planes-list', {planes, instructive});
        **** CODIGO PARA JSON ***** */

       /* **** CODIGO PARA DB ***** */
       db.plans.findAll()
       .then((planes)  => {
            let instructive = instructivoModel.leerJson(); // Como no está el modelo del instructivo, lo leo del JSON
            return res.render('planes-list', {planes, instructive});
       })
       .catch(reason => { 
            console.log(reason);
       });
       /* **** CODIGO PARA DB ***** */
    },

    detail: (req, res)=>{
          /* **** CODIGO PARA JSON *****
        //Leo el JSON de recetas
        let recetasJson = recetasModel.leerJson();
        //Busco el plan con el ID del parámetro
        let plan = planesModel.findById(req.params.planid);
        // Recetas que hay en la base con el id de Plan enviado por parámetro
        let recetas = recetasJson.filter(element => {
                  return element.idplan == req.params.planid;
        });
        //Calculo el precio que tendrá el plan según la cantidad de recetas que tiene el mismo
        let precioTotal = recetas.reduce(function(total, element){
            return total += element.precio;
        }, 0);
        
        return res.render('planes-detail', {plan, recetas, precioTotal });
         **** CODIGO PARA JSON ***** */


         /* **** CODIGO PARA DB ***** */
        
        let planBuscado = req.params.planid;
        // El plan 4 es el plan personalizado

        if (planBuscado != planes.PLAN_PERSONALIZADO){
            
            db.plans.findByPk(planBuscado, {
                include: [{association: 'receta'}]
            })
            .then((plan) => {
                //Calculo el precio total del plan consultando en la BD de recetas por el Plan elegido
                db.recipes.sum('precio', {
                    where: {
                        planId: planBuscado
                    }
                }).then((precioTotal)=>{
                    console.log('El precio de devuelve la base es:'+ parseFloat(precioTotal));
                    return res.render('planes-detail', {plan, precioTotal });
                })                
                .catch(reason => { 
                    console.log(reason);
                })
            })
        }else{
            db.recipes.findAll()
            .then((recetas) => {
                return res.render('plan-personalizado', {recetas});
            })
            .catch((reason) => {
                console.log(reason);
            })
        }
       
         /* **** CODIGO PARA DB ***** */
    }
};

module.exports = controller;
