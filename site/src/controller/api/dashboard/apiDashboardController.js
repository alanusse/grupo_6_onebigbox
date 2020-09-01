const db = require('../../../database/models');

const controller = {
    // API para la parte superior del dashboard donde se muestran las estadísticas del sitio
    getDashboardStadistics: (req, res) =>{
       //Para esta llamada voy a necesitar que devuelva:
        // Cantidad de recetas 
        // Cantidad total del monto de las recetas
        // Cantidad de Usuarios

        let query = 'select count(*) as productsInDataBase , sum(precio) as amountProducts from recipes';
        let userQuantity = 0;

        //1. Busco cantidad de usuarios
        db.Users.count('id')
            .then(function(users){
                //Asigno la cantidad de usuarios a una variable
                userQuantity =users;

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
                        data: {
                            productsInDataBase: resultado[0].productsInDataBase,
                            amountProducts: resultado[0].amountProducts,
                            userQuantity :userQuantity
                        }
                    }
                return res.send(jsonResult);
                })
                .catch(error=>{
                    console.log(error);
                    jsonResult = {
                        meta: {
                            status: 404                
                        },
                        data: 'Error Access'
                    }    
                    return res.send(jsonResult);
                })
            })
            .catch(error=>{
                console.log(error);
                jsonResult = {
                    meta: {
                        status: 404                
                    },
                    data: 'Error Access'
                }    
                return res.send(jsonResult);
            })            
    },
    // API que devuelve todas las categorías que contiene la BD para mostrarla en el apartado de categorías del dashboard
    getDashboardCategories: (req, res) => {
        // Tengo que obtener un listado de planes que en nuestros proyectos son las categorias
        db.Plans.findAll()
            .then((resultado) => {
                let jsonResult = {
                    meta: {
                        status: 200,
                        desc: 'Esta API devuelve todas las categorías de la base de datos',
                        count: resultado.length,
                        url: 'api/dashboard/getCategories'            
                    },
                    data: resultado
                }
                return res.send(jsonResult);
            })
            .catch(error=>{
                console.log(error);
                jsonResult = {
                    meta: {
                        status: 404                
                    },
                    data: 'Error Access'
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
                data: resultado
            }
            return res.send(jsonResult);
        })
        .catch(error=>{
            jsonResult = {
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