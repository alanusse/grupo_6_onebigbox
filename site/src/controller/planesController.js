const fs = require('fs');
const path = require('path');

//Ubicación del archivo JSON con los productos, futuro
const planesFilePath = path.join(__dirname, '../data/planesDataBase.json');
const instructionsFilePath = path.join(__dirname, '../data/instructionsDataBase.json')
const recetasFilePath = path.join(__dirname, '../data/recetasDataBase.json');


//Función para leer y parsear el json con los datos de los productos
function leerJson (filePath){
	const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
	return products;
}

const controller ={
    root: (req, res) => {
        // Mostrar todos los planes e instructivo.
        let planes = leerJson(planesFilePath);
        let instructive = leerJson(instructionsFilePath);
     
        return res.render('planes-list', {planes, instructive});
    },

    detail: (req, res)=>{
        let planesJson = leerJson(planesFilePath);
        let recetasJson = leerJson(recetasFilePath);

        console.log('pasó por acá');
        // Acá busco el el PLAN con el id enviado por parámetro
        let plan = planesJson.filter(element => {
            return element.id == req.params.planid;
        });
       
        // Recetas que hay en la base con el id de Plan enviado por parámetro
        let recetas = recetasJson.filter(element => {
                  return element.idplan == req.params.planid;
        });
        //Calculo el precio que tendrá el plan según la cantidad de recetas que tiene el mismo
       /* JF: COMMITEO PORQUE NO ME SALIO, LO SIGO DESPUES 
       */

        // console.log(recetas);
        //console.log(recetas.lenght);

        let precioTotal = recetas.reduce(function(total, element){
           
            return total += element.precio;
        }, 0);
        
        //console.log(precioPlan);
    
      return res.render('planes-detail', {plan, recetas, precioTotal });
    }

};

module.exports = controller;
