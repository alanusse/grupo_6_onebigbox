
const db = require('../../database/models');

const controller = {
    updateCartById: (req, res) => {
        // Parametros idItem , newCant , itemPrice
        db.Items.update({
            recipeCant: req.body.recipeCant,
            totalPrice: req.body.recipeCant * req.body.itemPrice
        },{
            where:{ id: req.body.idItem}
        })
        .then((item) =>{
            let jsonResult ={
                meta: {
                    status: 200,
                    hasErrors: false
                },
                data: {
                    errors: null
                }
            }
            return res.send(jsonResult);
        })
        .catch(error=>{
            console.log(error);
            let jsonResult = {
                meta: {
                    status: 404                
                },
                data: 'Error Access'
            }    
            return res.send(jsonResult);
        })

    },
    deleteCartByUserId: (req, res) => {
        console.log('entró en el deleteCart');
        console.log(req.body.userId);
        //Borro todos los elementos del carrito que pertenecen a determinado usuario
        db.Items.destroy({
            where: {
                userId: req.body.userId
            }
        })
        .then((items)=>{
            let jsonResult ={
                meta: {
                    status: 200,
                    obj: 'Elimina todos los items del carrito de un determinado usuario',
                    url: 'api/cart/deleteCart',
                    hasErrors: false
                },
                data: {
                    errors: null
                }
            }
            return res.send(jsonResult);
        })
        .catch(error=>{
            console.log(error);
            let jsonResult = {
                meta: {
                    status: 404                
                },
                data: 'Error Access'
            }    
            return res.send(jsonResult);
        })
    },
    deleteCartByItemId: (req, res) => {
        console.log('entró en el deleteCartByItemId');
        //Borro todos los elementos del carrito que pertenecen a determinado usuario
        db.Items.destroy({
            where: {
                id: req.body.idItem
            }
        })
        .then((items)=>{
            let jsonResult ={
                meta: {
                    status: 200,
                    obj: 'Elimina un determinado item del carrito',
                    url: 'api/cart/deleteCartByIdItem',
                    hasErrors: false
                },
                data: {
                    errors: null
                }
            }
            return res.send(jsonResult);
        })
        .catch(error=>{
            console.log(error);
            let jsonResult = {
                meta: {
                    status: 404                
                },
                data: 'Error Access'
            }    
            return res.send(jsonResult);
        })
    }


};
module.exports = controller;