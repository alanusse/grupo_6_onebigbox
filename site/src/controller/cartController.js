const db = require('../database/models');

const controller ={
    root: (req, res) =>{
    
        return res.render('cart');
    },
    agregarAlCarrito: (req, res) => {
        
        return res.redirect('/cart');
    },
    addRecipe: (req, res) => {
        db.Recipes.findOne({
            where: {
                id: req.params.id
            }
        }).then(response => {
            db.Items.create({
                userId: req.session.user.id,
                recipeId: response.id,
                recipeTitulo: response.titulo,
                recipePrecio: response.precio,
                recipeCant: 1,
                planId: response.planId
            });
        }).catch(error => console.log(error))

        return res.redirect('/cart');
    }
};

module.exports = controller;