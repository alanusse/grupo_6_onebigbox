const jsonModel = require('../models/jsonModel');
const planesModel = jsonModel('planesDataBase');


const instructivoModel = jsonModel('instructionsDataBase');
const recetasModel = jsonModel('recetasDataBase');



const controller ={
    root: (req, res) => {
       // Leo los JSON de Planes e Instructivo para mostrarlo por pantalla
       let planes = planesModel.leerJson();
       let instructive = instructivoModel.leerJson();

       return res.render('planes-list', {planes, instructive});
    },

    detail: (req, res)=>{
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
    }
};

module.exports = controller;
