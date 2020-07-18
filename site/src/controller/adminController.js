const db = require('../database/models');

const planes = {
    PLAN_FAMILIAR: 1,
    PLAN_EQUILIBRADO: 2,
    PLAN_VEGETARIANO: 3,
    PLAN_PERSONALIZADO: 4
};

const controller ={
    root: (req, res) => {
        //return res.redirect('/admin/planes'); 
        return res.redirect('/admin/planes'); 
    },
    planes: (req, res) => {
        db.plans.findAll()
        .then((planes) => {
            return res.render('admin/abm-planes-list', {planes});
        })
        .catch((motivo) => {
            console.log(motivo);
        })
    },
    altaPlan: (req, res) => {
        return res.render('admin/abm-planes-alta');
    },
    registrarPlan: (req, res) => {
        console.log(req.file);
        // Inserto en la base de datos lo que el usuario ingresó
        db.plans.create({
            plan: req.body.plan,
            description: req.body.description,
            image: (req.file)? req.file.filename:'image1.png',
        });

        return res.redirect('/admin/planes'); 
    },
    recetas: (req, res) => {
        db.recipes.findAll()
            .then((recetas) => {
                return res.render('admin/abm-recetas-list', {recetas});
            })
            .catch((motivo) => {
                console.log(motivo);
            })
        },
    altaReceta: (req, res) => {
        //Busco los planes que existen en la BD para cargar el combo
        db.plans.findAll()
        .then((planes) => {
            return res.render('admin/abm-recetas-alta', {planes});
        })
        .catch((motivo) => {
            console.log(motivo);
        })
    },
    registrarReceta: (req, res) => {
        console.log(req.file);
        // Inserto en la base de datos lo que el usuario ingresó
        db.recipes.create({
            titulo: req.body.titulo,
            description: req.body.description,
            tiempopreparacion: req.body.tiempopreparacion,
            pasos:req.body.pasos,
            ingredientes:req.body.ingredientes ,
            precio: req.body.precio ,
            image: (req.file)? req.file.filename:'image1.png',
            planId: req.body.planId,
        });

        return res.redirect('/admin/recetas'); 
    }
};

module.exports = controller;
