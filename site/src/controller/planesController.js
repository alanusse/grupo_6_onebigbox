const fs = require('fs');
const path = require('path');

//Ubicación del archivo JSON con los productos, futuro
const planesFilePath = path.join(__dirname, '../data/planesDataBase.json');
const instructionsFilePath = path.join(__dirname, '../data/instructionsDataBase.json')

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

};

module.exports = controller;
