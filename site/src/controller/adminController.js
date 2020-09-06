const db = require('../database/models');

const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

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
            db.Users.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(data => {
                console.log('Entró en el Then y la data es:')
                console.log(data.dataValues);

                if(data !== null) {
                    if(bcrypt.compareSync(req.body.password, data.dataValues.password)) {
                        if(data.dataValues.admin != 0) {
                            //Me fijo si exite una cookie activa y si esa cookie es diferente al usuario que se está logueando
                            if ((req.cookies.email) && (req.cookies.email !== data.dataValues.email)){
                                res.clearCookie('email'); 
                            }
                            delete data.dataValues.password; // Por seguridad borramos la password
                            req.session.user = data.dataValues;
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
            .catch(error=>{
                console.log(error);
            })
        } else {
            return res.render('admin/admin-login', { errors: errors.errors });
        }
    },

    planes: (req, res) => {
        db.Plans.findAll()
        .then((planes) => {
            return res.render('admin/abm-planes-list', {planes});
        })
        .catch((motivo) => {
            console.log(motivo);
        })
    },

    altaPlanGet: (req, res) => {
        return res.render('admin/abm-planes-alta');
    },

    altaPlanPost: (req, res) => {
        console.log(req.file);
        let errors = validationResult(req);

        if (errors.isEmpty()){
            // fs.createReadStream(path.resolve(__dirname + '../../public/img/planes' )).pipe(fs.createWriteStream(path.resolve(__dirname + "../../../../../ProyectoFinalDashboard/dashboard/public/images/planes")));
            // Inserto en la base de datos lo que el usuario ingresó
            db.Plans.create({
                plan: req.body.plan,
                description: req.body.description,
                image: (req.file)? req.file.filename:'image1.png',
            })
            .then(function(){
                return res.redirect('/admin/planes'); 
            })
        }else{
            db.Plans.findAll()
            .then((planes) => {
                return res.render('admin/abm-planes-alta', {planes, errors : errors.errors, old: req.body});
            })
        }
    },
    modificarPlanGet: (req, res) => {
        db.Plans.findByPk(req.params.id)
        .then(plan => {
            if(plan != null) {
                return res.render('admin/abm-planes-modificacion', { plan });
            } else {
                return res.redirect('/admin/planes');
            }
        })
        .catch(error => {
            return res.redirect('/admin/planes');
        })
    },
    modificarPlanPost: (req, res) => {    
       let errors = validationResult(req);

        if(errors.isEmpty()) {
            db.Plans.update({
                plan: req.body.plan,
                description: req.body.description,
                image:  (req.file)? req.file.filename : req.body.image,
            },
            {
                where: {
                    id: req.params.id
                }
            })
            .then(function(){
                console.log('Datos de plan actualizados!')
                return res.redirect('/admin/planes');
            })
            .catch(error => {
                console.log(error);
            })
        } else {
            let plan = {
                plan: req.body.plan,
                description: req.body.description,
                image: req.file.filename,
            }
            return res.render('admin/abm-planes-modificacion', { plan, errors: errors.errors });
        }
    },
    eliminarPlanPost: (req, res) => {
        db.Plans.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function(){
            console.log('Plan ' + req.params.id+  ' Eliminado')
            return res.redirect('/admin/planes');
        })
        .catch(error=>{
            console.log(error);
        })
        
    },
    recetas: (req, res) => {
        db.Recipes.findAll()
            .then((recetas) => {
                return res.render('admin/abm-recetas-list', {recetas});
            })
            .catch((motivo) => {
                console.log(motivo);
            })
    },
    altaRecetaGet: (req, res) => {
        //Busco los planes que existen en la BD para cargar el combo
        db.Plans.findAll()
        .then((planes) => {
            return res.render('admin/abm-recetas-alta', {planes});
        })
        .catch((motivo) => {
            console.log(motivo);
        })
    },
    altaRecetaPost: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()){
            // Inserto en la base de datos lo que el usuario ingresó
            db.Recipes.create({
                titulo: req.body.titulo,
                description: req.body.description,
                tiempopreparacion: req.body.preparationtime,
                pasos:req.body.pasos,
                ingredientes:req.body.ingredientes ,
                precio:req.body.precio ,
                image:req.file.filename,
                planId:req.body.recipeplan,
            })
            .then(function(){
                return res.redirect('/admin/recetas'); 
            })
            .catch(error =>{
                console.log(error);
            })
        }else{
            
            db.Plans.findAll()
            .then((planes) => {
                return res.render('admin/abm-recetas-alta', {planes, errors : errors.errors, old: req.body});
            })
        }
    },
    modificarRecetaGet: (req, res) => {
        db.Recipes.findByPk(req.params.id)
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
        if(errors.isEmpty()) {
            db.Recipes.update({
                titulo: req.body.title,
                description: req.body.description,
                ingredientes: req.body.ingredients,
                pasos: req.body.preparation,
                tiempopreparacion: req.body.preparationtime,
                precio: req.body.price,
                image:  (req.file)? req.file.filename : req.body.image,
                planId: req.body.recipeplan
            },
            {
                where: {
                    id: req.params.id
                }
            })
            .then(function(){
                console.log('Datos de receta actualizados!')
                return res.redirect('/admin/recetas');
            })
            .catch(error => {
                console.log(error);
            })
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
        db.Recipes.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function(){
            return res.redirect('/admin/recetas');
        });  
    },
    /*USUARIOS*/
    listarUsuarios: (req, res) =>{
        //Obtengo todos los usuarios de la base de datos
        db.Users.findAll({
            order: [['admin', 'DESC']],
        })
            .then(function(users){
                return res.render('admin/abm-users-list', {users});
            })
            .catch(error =>{
                console.log(error);
            })
    },
    editarUsuario: (req, res) => {
       //Busco en la tabla Usuarios el que coincide con el parámetro
        db.Users.findByPk(req.params.id)
        .then(function(user){
            delete user.dataValues.password;
            return res.render('admin/abm-users-modificacion', {old: user.dataValues, user: user.dataValues});
        })
        .catch(error => {
            console.log(error);
        })
    },
    editarUsuarioBD: (req, res) =>{
        let errors = validationResult(req);
        if (errors.isEmpty()){
            let user = {
                name : req.body.name,
                lastname : req.body.lastname,
                email : req.body.email,
                avatar: (req.file)? req.file.filename : req.body.avatar,
                admin: req.body.admin // Valor que figure en el combo
            }
            if (req.body.password){
                user.password = bcrypt.hashSync(req.body.password, 10);
            }
            console.log(user);
            db.Users.update(user,{
                where:{ id: req.params.id}
            })
            .then(function(){
                console.log('Datos del usuario actualizados!')
                return res.redirect('/admin/users');
            })
            .catch(error => {
                    console.log(error);
                })             
        } else {
            db.Users.findByPk(req.params.id)
                .then(function(user){
                    delete user.dataValues.password;
                    return res.render('admin/abm-users-modificacion', { errors:errors.errors, old: req.body, user});
                })
                .catch(error => {
                    console.log(error);
                })
        }
            // Vuelvo a la vista con el error que me dió

    },
    eliminarUsuarioBD : (req, res) =>{
        //ID del Usuario a eliminar: req.params.id
        db.Users.destroy({
            where: {
                id: req.params.id
            }
            })
            .then(function(){
                // Me fijo si el usuario que estoy dando de baja está en la cookie para eliminarlo
                if (req.cookies.email == req.params.mail){
                    req.session.destroy(); // Mato la sessión del usuario que eliminé
                    res.clearCookie('email'); // Borro la cookie
                }
                console.log('Usuario Eliminado!')
                return res.redirect('/admin/users');
            })
            .catch(error => {
                console.log(error);
            })
            
        },
    altaUsuario : (req, res) => {
        // Redirecciono a la página del alta
        return res.render('admin/abm-users-alta');
    },
    altaUsuarioBD : (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            //Creo el objeto Usuario
            let newUser = {
                name : req.body.name,
                lastname : req.body.lastname,
                email : req.body.email,
                password : bcrypt.hashSync(req.body.password, 10),
                avatar:  (req.file)? req.file.filename : 'default.png',
                admin: req.body.admin // USER: 0 o ADMIN:1 -->Por defecto, todos son 0 (USER)
            }
            db.Users.create(newUser)
            .then(user =>{
                  return res.redirect('/admin/users');
            })
            .catch(err => console.log(err))
        } else {
            return res.render('admin/abm-users-alta', { errors : errors.errors, old: req.body });
            //return res.render("user/register", { errors: errors.mapped(), old: req.body }); -> Como lo hizo Gonza
        }
    }
};

module.exports = controller;
