const db = require('../database/models');

const planes = {
    PLAN_FAMILIAR: 1,
    PLAN_EQUILIBRADO: 2,
    PLAN_VEGETARIANO: 3,
    PLAN_PERSONALIZADO: 4
}

const controller ={
    root: (req, res) => {
        //return res.redirect('/admin/planes'); 
        return res.redirect('/admin/recetas'); 
    },
    recetas: (req, res) => {
        db.recipes.findAll()
            .then((recetas) => {
                return res.render('admin/abm-recetas-list', {recetas});
               // return res.render('user/login');
               // return res.render('admin/abm-recetas-list', {recetas});
            })
            .catch((reason) => {
                console.log(reason);
            })
    }

};

module.exports = controller;