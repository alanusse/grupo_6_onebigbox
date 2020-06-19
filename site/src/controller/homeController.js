const fs = require('fs');
const path = require('path');

//Ubicación del archivo JSON con los productos
const instructionsFilePath = path.join(__dirname, '../data/instructionsDataBase.json');

// En algún momento vamos a usar la función para que nos muestre el formato precio con decimales y punto en los miles.
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//Función para leer y parsear el json con los datos de los productos
function leerJson (filePath){
	const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
	return products;
}

const controller ={
    root: (req, res) =>{

        const instructive = leerJson(instructionsFilePath);
        return res.render('home', {instructive});
    },
    howtouse: (req, res) => {
        const instructive = leerJson(instructionsFilePath);
        return res.render('how-to-use', {instructive});
    },
    nosotros: (req, res) => {
        const instructive = leerJson(instructionsFilePath);
        return res.render('nosotros',{instructive});
    }

};

module.exports = controller;


