const db = require('../../../database/models');
const fetch = require('node-fetch');

const controller = {
    // API para la parte superior del dashboard donde se muestran las estadísticas del sitio
    getDashboardStadistics: (req, res) =>{
       //Para esta llamada voy a necesitar que devuelva:
        // Cantidad de recetas 
        // Cantidad total del monto de las recetas
        // Cantidad de Usuarios

        let query = 'select count(*) as productsInDataBase , sum(precio) as amountProducts from recipes';
        let userQuantity = 0;
        let totalPurchase = 0;
        let totalCantPurcharse = 0;
        let totalUserPurcharse;

        //1. Busco cantidad de usuarios
        db.Users.count('id')
            .then(function(users){
                
                //Asigno la cantidad de usuarios a una variable
                userQuantity =users;
                db.Purchases.findAll()
                .then((purchase) => {
                    totalPurchase = purchase.reduce((total, item) => {
                        return total += parseFloat(item.total)
                    }, 0);
                    
                totalCantPurcharse = purchase.length;

                //Obtengo la cantidad de compras por usuario
                totalUserPurcharse= purchase.reduce((result, currentValue) => {
                    result[currentValue.userId] = (result[currentValue.userId] || 0)+1;
                    return result;
                  }, {}); // empty object is the initial value for result object

                  //Con esto obtengo la candad de Usuarios que compraron en el sitio
                console.log(Object.values(totalUserPurcharse).length);

                // Una vez que obtengo la cantidad de usuarios, busco la cantidad de recetas y el precio total
                db.sequelize.query(query)
                .then((recetas) => {
                    //Obtengo cantidad de recetas y monto total en la posición 0 del array
                    let resultado =  recetas[0];
                    let jsonResult = {
                        meta: {
                            status: 200,
                            desc: 'Esta API devuelve la cantidad total de productos en la base de datos, el monto total de los productos y la cantidad de usuarios cargados en el sistema ',
                            count: 1,
                            url: 'api/dashboard/getStadistics'            
                        },
                        result: [
                            {
                                title: 'Total Recetas Cargadas',
                                result: resultado[0].productsInDataBase,
                                typeResult: 'products',
                                origin: 'data'
                            },
                            {
                                title: 'Precio Total en Recetas',
                                result: resultado[0].amountProducts,
                                typeResult: 'amount',
                                origin: 'data'
                            },
                            {
                                title: 'Cantidad de Usuarios Registrados',
                                result :userQuantity,
                                typeResult: 'user',
                                origin: 'purcharse'
                            },
                            {
                                title: 'Cantidad de Ventas Totales',
                                result :totalCantPurcharse,
                                typeResult: 'totalPurchase',
                                origin: 'purcharse'
                            },
                            {
                                title: 'Monto total Vendido',
                                result : totalPurchase,
                                typeResult: 'amount',
                                origin: 'purcharse',
                                
                            },
                            {
                                title: 'Cantidad de Usuarios Compradores',
                                result : Object.values(totalUserPurcharse).length,
                                typeResult: 'userPurchase',
                                origin: 'purcharse'
                            }
                        ]
                    }
                return res.send(jsonResult);
                })
                .catch(error=>{
                    console.log(error);
                    jsonResult = {
                        meta: {
                            status: 404                
                        },
                        result: 'Error Access'
                    }    
                    return res.send(jsonResult);
                })
            }) //Cierro el then del purchase.findAll
            .catch(error=>{
                console.log(error);
                jsonResult = {
                    meta: {
                        status: 404                
                    },
                    result: 'Error Access'
                }    
                return res.send(jsonResult);
            })      
        })
        .catch((error)=>{console.log(error)})      
    },
    // API que devuelve todas las categorías que contiene la BD para mostrarla en el apartado de categorías del dashboard
    getDashboardPlans: (req, res) => {
        // Tengo que obtener un listado de planes que en nuestros proyectos son las categorias
        db.Plans.findAll()
            .then((resultado) => {
                let jsonResult = {
                    meta: {
                        status: 200,
                        desc: 'Esta API devuelve todas las categorías de la base de datos',
                        count: resultado.length,
                        url: 'api/dashboard/getPlans'     
                    },
                    result: resultado
                }
                return res.send(jsonResult);
            })
            .catch(error=>{
                console.log(error);
                jsonResult = {
                    meta: {
                        status: 404                
                    },
                    result: 'Error Access'
                }    
                return res.send(jsonResult);
            })   
    },
    // API que devuelve los últimos 10 productos creados en la base de datos, a fin de mostrarlos en la parte inferior izquierda del dashboard
    getLastProducts : (req, res) => {

        //Los productos son las recetas
        db.Recipes.findAll({
            order: [['createdAt', 'DESC']],
            limit: 10
        })
        .then((resultado) => {
            let jsonResult = {
                meta: {
                    status: 200,
                    desc: 'Esta API devuelve los últimos 10 productos creados en la base de datos',
                    count: resultado.length,
                    url: 'api/dashboard/getLastProducts'          
                },
                result: resultado
            }
            return res.send(jsonResult);
        })
        .catch(error=>{
            jsonResult = {
                meta: {
                    status: 404                
                },
                result: 'Error Access'
            }    
            return res.send(jsonResult);
        })   
    },
    getPurcharseRecipe : (req, res) => {
        let query = 'select recipeId, recipeTitulo, sum(recipeCant) as totalPurchase, sum(totalPrice) as totalAmount from items where state = 0 group by recipeId order by totalPurchase DESC';

        db.sequelize.query(query)
        .then((result) => {
                  
            let resultado =  result[0];
            let jsonResult = {
                meta: {
                    status: 200,
                    desc: 'Esta API devuelve la cantidad de ventas y el monto vendido por receta',
                    count: resultado.length,
                    url: 'api/dashboard/getPurcharseByRecipe'          
                },
                result: resultado
            }
            return res.send(jsonResult);
        })
        .catch(error=>{
            jsonResult = {
                meta: {
                    status: 404                
                },
                result: 'Error Access'
            }    
            return res.send(jsonResult);
        })   
    },
    getPurcharseUser : (req, res) => {
        let query = 'select userId, count(*) as totalPurchase, sum(totalPrice) as totalAmoun from items where state = 0 group by userId';

        db.sequelize.query(query)
        .then((result) => {
                  
            let resultado =  result[0];
            let jsonResult = {
                meta: {
                    status: 200,
                    desc: 'Esta API devuelve la cantidad de ventas y el total vendido agrupadas por usuario',
                    count: resultado.length,
                    url: 'api/dashboard/getPurcharseUser'          
                },
                result: resultado
            }
            return res.send(jsonResult);
        })
        .catch(error=>{
            jsonResult = {
                meta: {
                    status: 404                
                },
                result: 'Error Access'
            }    
            return res.send(jsonResult);
        })   
    }
};
module.exports = controller;