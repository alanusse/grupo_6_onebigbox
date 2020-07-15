const jsonModel = require('../models/jsonModel');
const planesModel = jsonModel('planesDataBase');
const instructivoModel = jsonModel('instructionsDataBase');


// En algún momento vamos a usar la función para que nos muestre el formato precio con decimales y punto en los miles.
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller ={
    root: (req, res) =>{
        //console.log(req.session.email);
        let emailUsuarioLogueado = req.session.email;

        //const instructive = leerJson(instructionsFilePath);
        const instructive = instructivoModel.leerJson();

      

        return res.render('home', {instructive, emailUsuarioLogueado});
    },
    howtouse: (req, res) => {
        //const instructive = leerJson(instructionsFilePath);
        const instructive = instructivoModel.leerJson();

        return res.render('how-to-use', {instructive});
    },
    nosotros: (req, res) => {
        //const instructive = leerJson(instructionsFilePath);
        const instructive = instructivoModel.leerJson();
        return res.render('nosotros',{instructive});
    }

};

module.exports = controller;


