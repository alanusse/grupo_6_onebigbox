const fs = require('fs');
const path = require('path');

//Ubicación del archivo JSON con los productos, futuro
const productsFilePath = path.join(__dirname, '../data/products.json');

//Función para leer y parsear el json con los datos de los productos
function leerJson (){
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products;
}

const controller ={
    root: (req, res) =>{
    
        return res.render('planes-list');
    } 

};

module.exports = controller;
