const fs = require('fs');
const path = require('path');

//Ubicación del archivo JSON con los productos
const recetasFilePath = path.join(__dirname, '../data/recetasDataBase.json');

//Función para leer y parsear el json con los datos de los productos
function leerJson (filePath){
	const products = JSON.parse(fs.readFileSync(recetasFilePath, 'utf-8'));
	return products;
}

const controller ={
    root: (req, res) => {
        // Mostrar todos los planes e instructivo.
        
        let recetas = leerJson(recetasFilePath);
        
   
        return res.render('recetas-list', {recetas});
    },

};

module.exports = controller;