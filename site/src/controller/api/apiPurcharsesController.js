const db = require('../../database/models');

const controller = {

    getPurcharses: (req, res) => {
        //Obtengo todos los registros de la base de datos
 
        db.Purchases.findAll({
            order: [['createdAt', 'DESC']]
            
        })
        .then((purcharses) => {
            if (purcharses.length >0 ){

                let jsonResult ={
                    meta: {
                        status: 200,
                        desc: 'Lista todas las compras realizadas en el sitio',
                        url: '/api/apiPurcharse/getPurcharses',
                        count: purcharses.length,
                        hasErrors: false
                    },
                    data: purcharses
                }
                return res.send(jsonResult);
            }else{
                let jsonResult ={
                    meta: {
                        status: 200,
                        desc: 'Lista todas las compras realizadas en el sitio',
                        url: '/api/apiPurcharse/getPurcharses',
                        count: purcharses.length,
                        hasErrors: true
                    },
                    data: {
                        errors: 'No se han efectuado compras'
                    }
                }
                
                return res.send(jsonResult);
            }
        })
        .catch((error)=> {console.log(error)})
    },
    getPurcharsesByUserId: (req, res) => {
        //Obtengo todos los registros de la base de datos
        console.log(req.params.userId)
        db.Purchases.findAll({
            where: {
                userId: req.params.userId
            },
            attributes: [
                'orderNumber',
                'userId',
                'total',
                'createdAt'
            ],
            order: [['createdAt', 'DESC']],
            
        })
        .then((purcharses) => {
           console.log(purcharses.length )

            purcharses = purcharses.map(purchase => {
                
                purchase.dataValues.createdAt = new Date(purchase.dataValues.createdAt).toLocaleDateString();

                return purchase;
            });

            if (purcharses.length >0 ){
                let jsonResult ={
                    meta: {
                        status: 200,
                        desc: 'Lista todas las compras realizadas en el sitio por un determinado usuario',
                        url: '/api/apiPurcharse/getPurcharsesByUserId',
                        count: purcharses.length,
                        hasErrors: false
                    },
                    data: purcharses
                }
                return res.send(jsonResult);
            }else{
               let jsonResult ={
                    meta: {
                        status: 200,
                        desc: 'Lista todas las compras realizadas en el sitio por un determinado usuario',
                        url: '/api/apiPurcharse/getPurcharsesByUserId/'+ req.params.userId,
                        count: purcharses.length,
                        hasErrors: true
                    },
                    data: {
                        errors: 'El usuario no ha realizado ninguna compra'
                    }
                }
                return res.send(jsonResult);
            }
            
        })
        .catch((error)=> {console.log(error)})
    }


};
module.exports = controller;