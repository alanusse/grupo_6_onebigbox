 const fs = require('fs');
const path = require('path');

//Aca voy a exportar una función que va a tener un objeto literal de funciones y de la ruta del Json
module.exports = (archivo)=>{ 
    //hago un return de un objeto literal, este objeto es quien va a darme todas las funcionalidades
    const funciones = {

        // Defino el path completo para luego usarlo en las funciones, concatenando el nombre del archivo con todo lo que necesito para que funcione
        path: path.join(__dirname, '..', 'data', archivo + '.json'),

        // Métodos del objeto literal
        leerJson: function () {
            const dataJson = fs.readFileSync(this.path, 'utf-8');
            const data = JSON.parse(dataJson);
            return data;
        },
        escribirJson: function (data){
            data = JSON.stringify(data, null, ' '); // Esta función lo que hace es convertir a Json lo que se le manda por parámetro        
            fs.writeFileSync(this.path, data);
        },
        guardarUno: function(newData){
            //Primero leo mi json entero
            let allData = this.leerJson();

            // Agrego la información que viene por parámetro 
            allData = [...allData, newData];
            //allData.push(newData);

            // Sobre escribo el json con la información
            this.escribirJson(allData);
        },
       findById: function (id) {
            const allData = this.leerJson();   

            const objeto = allData.find(function(elemento){
               return elemento.id == id;
            })
            return objeto;
         },
        filterbySomething: function(filtroDeseado){
            // Leo mi json
            const data = this.leerJson();
            // El filter recibe un callback, ese callback es el que le paso por parámetro
            const dataFiltrada = data.filter(filtroDeseado);

            return dataFiltrada;
        },
        edit: function (newData, id){
            let data =this.leerJson();

            //Creo el objeto con  los datos del producto
            let nuevoProducto = {
                id: id,
                ...newData
            };
            //Edito el producto
            data =data.map(product =>{
                if(product.id == id){
                    return nuevoProducto;
                }
                return product;
            })
            //Reescribo el JSON
            this.escribirJson(data);
        },
        newProduct: function(newData){
            let data =this.leerJson();
            //Calculo el nuevo id que va a tener el producto
            let nuevoid = data[data.length - 1].id + 1;
           //Creo el objeto con  los datos del producto
            let nuevoProducto = {
                id: nuevoid,
                ...newData
            };
            //Coloco en el Json El nuevo producto
            data = [...data, nuevoProducto];
            // Sobre escribo el json
            this.escribirJson(data);

        },
        deleteProduct: function(id){
            let data =this.leerJson();
            const newdata = data.filter(elemento => {
                return elemento.id != id;
            });
            // Sobre escribo el json
            this.escribirJson(newdata);
        }
    }

    return funciones;
}