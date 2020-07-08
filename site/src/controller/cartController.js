const jsonModel = require('../models/jsonModel');
const planesModel = jsonModel('planesDataBase');
const carritoModel = jsonModel('cartDataBase');

const controller ={
    root: (req, res) =>{
    
        return res.render('cart');
    },
    agregarAlCarrito: (req, res) => {
        //En el request tengo la info del plan
        //console.log('Pasó por agregar al carrito' + req.body);
        
        let planElejido = planesModel.findById(req.params.planid);
        
        let itemCompra = {
            id:'',
            idPlanElejido : planElejido.id,
            planElejido: planElejido.plan,
            descriptionPlanElejido : planElejido.description 
        }
        carritoModel.guardarUno(itemCompra);

        return res.redirect('/cart');
    }

    
 

};

module.exports = controller;