const db = require('../database/models');

const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const planes = {
    PLAN_FAMILIAR: 1,
    PLAN_EQUILIBRADO: 2,
    PLAN_VEGETARIANO: 3,
    PLAN_PERSONALIZADO: 4
};

const controller = {
    adminLogin: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()) {
            db.users.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(data => {
                if(data !== null) {
                    if(bcrypt.compareSync(req.body.password, data.password)) {
                        if(data.admin != 0) {
                            req.session.admin = req.body.email;
                            return res.redirect('/admin/planes');
                        } else {
                            errors.errors.push({ msg: 'Esta sección es únicamente para administradores' });
                            return res.render('admin/admin-login', { errors: errors.errors });
                        }
                    } else {
                        errors.errors.push({ msg: 'El correo electrónico o la contraseña son incorrectos' });
                        return res.render('admin/admin-login', { errors: errors.errors });
                    }
                } else {
                    errors.errors.push({ msg: 'No se encontró una cuenta con esas credenciales' });
                    return res.render('admin/admin-login', { errors: errors.errors });
                }
            })
        } else {
            return res.render('admin/admin-login', { errors: errors.errors });
        }
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
        
        console.log('entró al post');

        let errors = validationResult(req);
        
        console.log(errors);

        if (errors.isEmpty()){
                
            // Inserto en la base de datos lo que el usuario ingresó
            db.recipes.create({
                titulo: req.body.titulo,
                description: req.body.description,
                tiempopreparacion: req.body.preparationtime,
                pasos:req.body.pasos,
                ingredientes:req.body.ingredientes ,
                precio:req.body.precio ,
                image:req.file.filename,
                planId:req.body.recipeplan,
            });

            return res.redirect('/admin/recetas'); 
        }else{
            
            db.plans.findAll()
            .then((planes) => {
                return res.render('admin/abm-recetas-alta', {planes, errors : errors.errors, old: req.body});
            })
        }
    },
    modificarRecetaGet: (req, res) => {
        db.recipes.findByPk(req.params.id)
        .then(data => {
            if(data != null) {
                return res.render('admin/abm-recetas-modificacion', { data });
            } else {
                return res.redirect('/admin/recetas');
            }
        })
        .catch(error => {
            return res.redirect('/admin/recetas');
        })
    },
    modificarRecetaPost: (req, res) => {
        let errors = validationResult(req);
        console.log(req.body)
        if(errors.isEmpty()) {
            db.recipes.update({
                titulo: req.body.title,
                description: req.body.description,
                ingredientes: req.body.ingredients,
                pasos: req.body.preparation,
                tiempopreparacion: req.body.preparationtime,
                precio: req.body.price,
                planId: req.body.recipeplan
            },
            {
                where: {
                    id: req.params.id
                }
            })
            .catch(error => {
                console.log(error);
            })
            console.log('Datos de receta actualizados!')
            return res.redirect('/admin/recetas');
        } else {
            let data = {
                titulo: req.body.title,
                description: req.body.description,
                ingredientes: req.body.ingredients,
                pasos: req.body.preparation,
                tiempopreparacion: req.body.preparationtime,
                precio: req.body.price
            }
            return res.render('admin/abm-recetas-modificacion', { data, errors: errors.errors });
        }
    },
    eliminarRecetaPost: (req, res) => {
        db.recipes.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.redirect('/admin/recetas');
    },
    listarUsuarios: (req, res) =>{
        //Obtengo todos los usuarios de la base de datos
        db.users.findAll()
            .then(function(users){
                console.log(users);
                return res.render('admin/abm-users-list', {users});
            })
            .catch(error =>{
                console.log(error);
            })
    },
    editarUsuario: (req, res) => {
        console.log('entro en el get de editarUsuario');
        db.users.findByPk({
            where: {
                id: req.params.id
            }
        })
        .then(function(user){
            console.log('entró al then');
            return res.render('admin/abm-users-modificacion', {user});
        })
    }
};

module.exports = controller;
