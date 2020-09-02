const db = require('../database/models');
const plan = require('../database/models/plan');
const states = {
    ABIERTO: 1,
    CERRADO: 0
}
const controller ={
    root: (req, res) =>{
        
        //Busco todos los items agregados por ese usuario
        db.Items.findAll({
            where: {
                userId: req.session.user.id,
                state: states.ABIERTO
            }
        })
        .then((items)=>{   
            
            let total = items.reduce((acum, item ) => acum += Number(item.totalPrice), 0)
           
            return res.render('cart', {items, total});
        })
        .catch(error => console.log(error))
    },
    agregarAlCarrito: (req, res) => {
        const planAgregado = req.params.planid;
        db.Recipes.findAll({
            where: {
                planId: planAgregado
            },
            
            include: [{association: 'planes'}]
        // db.Plans.findByPk(planAgregado, {
        //     raw: true,
        //     nest: true,
        //     include: [{association: 'receta'}]
        
        }).then(response => {
            const responseObj = response;
            // Hacer un for al response con un PUSH y armar un nuevo array de items, y ahí usar bulkCreate().
            let responseArr = Object.entries(responseObj);
            console.log(responseArr);
            let itemsArr = [];
            for(let i=0; i<itemsArr.length; i++){
                itemsArr.push({
                    userId: req.session.user.id,
                    recipeId: response.id,
                    recipeTitulo: response.titulo,
                    recipePrecio: response.precio,
                    recipeImage: response.image,
                    recipeCant: 1,
                    planId: response.id,
                    planTitulo: response.planes.plan,
                    planDescription: response.planes.description,
                    planImage: response.planes.image,
                    totalPrice: response.planes.precio * 1,
                    purchaseId: null,
                    state: states.ABIERTO
            })
                console.log(itemsArr);
            }
           console.log('ESTA ES LA RESPONSE')
            db.Items.bulkCreate(itemsArr)
            .then(item =>{
                return res.redirect('/cart');
                //return res.send(item)
            })
            .catch(err => console.log(err))
        }).catch(error => console.log(error))
    },
    addRecipe: (req, res) => {    
        db.Recipes.findOne({
            where: {
                id: req.params.id
            },
            include: [{association: 'planes'}]
        }).then(response => {   
           console.log(response);

            let newitem = {
                userId: req.session.user.id,
                recipeId: response.id,
                recipeTitulo: response.titulo,
                recipePrecio: response.precio,
                recipeImage: response.image,
                recipeCant: 1,
                planId: response.planId,
                planTitulo: response.planes.plan,
                planDescription: response.planes.description,
                planImage: response.planes.image,
                totalPrice: response.precio * 1,
                purchaseId: null,
                state: states.ABIERTO
            }
           
            db.Items.create(newitem)           
            .then(item =>{
                return res.redirect('/cart');
                //return res.send(item)
            })
            .catch(err => console.log(err))
        }).catch(error => console.log(error))
    },
    deleteAllCart: (req, res) => {
        console.log('entró en el delete')
        //Borro todos los elementos del carrito que pertenecen a determinado usuario
        db.Items.destroy({
            where: {
                userId: req.session.user.id
            },
            force: true,
        })
        .then((items)=>{
         // return res.send(items)

            return res.redirect('/cart');
        })
        .catch(error => console.log(error))
    },
    deleteCartById: (req, res) => {
        console.log('El item que voy a borrar es:' + req.body.itemId);
        //Borro todos los elementos del carrito que pertenecen a determinado usuario
        db.Items.destroy({
            where: {
                id: req.body.itemId
            },
            force: true,
        })
        .then((item)=>{
            return res.redirect('/cart');
        })
        .catch(error => console.log(error))

    },
    shop : (req, res) => {
        let total = 0;
        //Primero busco los items cuyo estado sea ABIERTO
        db.Items.findAll({
            where: {
                userId: req.session.user.id,
                state: states.ABIERTO
            }
        })
        .then((items) =>{
            //total = items.reduce((total, item) => total += item.totalPrice);
            items.forEach(item => {
                total = total + item.totalPrice
            });
           

            //El findOne me trae un solo registro y como yo lo estoy ordenando de manera descendiente, me va a traer el último para que yo pueda sumar uno
            return db.Purchases.findOne({
                order: [['createdAt', 'DESC']]
            })
        })
            .then((cart) => {
                    
                //Creo el objeto purcharse para luego insertarlo en el carrito
                //Yo digo que empiece el orderNumber en 100
                let itemPurcharse = {
                    orderNumber: (cart.dataValues.orderNumber)? cart.dataValues.orderNumber + 1: 100,
                    userId: req.session.user.id,
                    total: total
                }
                // Creo el ítem en la tabla Purchases, esto equivale a realizar la compra
                return db.Purchases.create(itemPurcharse)
            })
                .then((cart)=>{
                    // Hago update en la tabla carrito para indicar que la compra fue realizada
                    return db.Items.update({
                        purchaseId: cart.id,
                        state: states.CERRADO
                    },{
                        where:{
                        userId: req.session.user.id,
                        state: states.ABIERTO
                        } 
                    }) 
                })
                    .then((itemUpdate)=>{
                        console.log('Item Actualizado');
                        console.log(itemUpdate);

                        console.log('COMPRA FINALIZADA');

                        return res.redirect('/cart/history/'+ req.session.user.id);
                    })
                    .catch(error => console.log(error))
    },
    history : (req, res) =>{
        console.log('Pasó por el History');

        return res.render('cart-history');
    },
    historyByUser : (req, res) =>{
        console.log('Pasó por el History');

        return res.render('cart-history');
    }
};

module.exports = controller;