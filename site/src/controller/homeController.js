const fs = require('fs');
const path = require('path');

//Ubicación del archivo JSON con los productos
const productsFilePath = path.join(__dirname, '../data/products.json');


// En algún momento vamos a usar la función para que nos muestre el formato precio con decimales y punto en los miles.
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//Función para leer y parsear el json con los datos de los productos
function leerJson (){
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products;
}

const controller ={
    root: (req, res) =>{
    
        return res.render('home');
    } 

};

module.exports = controller;

