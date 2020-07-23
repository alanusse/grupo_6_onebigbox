const path = require('path');
const bcrypt = require('bcryptjs');
const { body } = require('express-validator');


//Llamo al modelo de Usuarios para validarlo en el LOGIN
const jsonModel = require('../models/jsonModel');
const usersModel = jsonModel('userDataBase');

module.exports = {
    register: [
        body('nombre')
            .notEmpty()
            .withMessage('El nombre es obligatorio')
            .bail()
            .isLength({ min: 4 })
            .withMessage('El nombre debe tener un mínimo de 4 caracteres'),
        body('apellido')
            .notEmpty()
            .withMessage('El apellido es obligatorio')
            .bail()
            .isLength( { min: 4 })
            .withMessage('El apellido debe tener un mínimo de 4 caracteres'),
        body('email')
            .notEmpty()
            .withMessage('El correo electrónico es obligatorio')
            .bail()
            .isEmail()
            .withMessage('El correo electrónico no es válido')
            .bail()
            .custom(function(value, {req}){
              let users = usersModel.leerJson();
              //Código para validar mail

              const user = users.find(function(user) {
                  return user.email == value
              })
              if(user){
                return false;
              }else{
                
                return true;
              }
          })
          .withMessage('El correo electrónico ya está registrado'),
        body('password')
            .notEmpty()
            .withMessage('La contraseña es obligatoria')
            .bail()
            .isLength( { min:4, max:10})
            .withMessage('La contraseña debe tener un mínimo de 4 y un máximo de 10 caracteres'),
        body("avatar")
            /*.custom((value, { req }) => {
              if (req.file) {
                return true;
              } else {
                return false;
              }
            })
            .withMessage("Imagen obligatoria")
            .bail()*/
            .custom((value, { req }) => {
              if (req.file) {
                const acceptedExtensions = [".jpg", ".jpeg", ".png"];
      
                const ext = path.extname(req.file.originalname);
      
                if (acceptedExtensions.includes(ext)) {
                  return true;
                } else {
                  return false;
                }
              } else {
                return true;
              }
            })
            .withMessage("La extensión de la imágen no es válida (extensiones permitidas: .jpg, .jpeg y .png)"),        
    ],
    login: [
        body('email')
            .notEmpty()
            .withMessage('El correo electrónico es obligatorio')
            .bail()
            .custom(function(value, {req}){
                let users = usersModel.leerJson();
                //Código para validar mail y contraseña
    
                const user = users.find(function(user) {
                    return user.email == value
                })
                if(user){
                    // seguimos preguntando
                    return bcrypt.compareSync(req.body.password, user.password);
                } else {
                    return false
                }
            })
            .withMessage('El correo electrónico o la contraseña no coinciden'),
        body('password')
            .notEmpty()
            .withMessage('La contraseña es obligatoria'),
    ],
    altaReceta: [      
        body('titulo')
          .notEmpty()
          .withMessage('Debe ingresar un título'),
        body('description')
          .notEmpty()
          .withMessage('Debe ingresar una descripción'),
        body('preparationtime')
          .notEmpty()
          .withMessage('Debe ingresar el tiempo de preparación de la receta')
          .bail()
          .isNumeric()
          .withMessage('El tiempo de preparación debe ser un número'),
        body('ingredientes')
          .notEmpty()
          .withMessage('Debe ingresar los ingredientes de la receta'),
        body('precio')
          .notEmpty()
          .withMessage('Debe ingresar el precio de la receta')
          .bail()
          .isNumeric()
          .withMessage('El precio de la receta debe ser un número'),
        body('recipeplan')
          .notEmpty()
          .withMessage('La receta debe estar asociada a un plan'),
        body('image')
        .custom((value, { req }) => {
          if (req.file) {
            return true;
          } else {
            return false;
          }
        })
        .withMessage("Imagen obligatoria")
        .bail()
        .custom((value, { req }) => {
          if (req.file) {
            const acceptedExtensions = [".jpg", ".jpeg", ".png"];
            const ext = path.extname(req.file.originalname);
            if (acceptedExtensions.includes(ext)) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        })
        .withMessage("La extensión de la imágen no es válida (extensiones permitidas: .jpg, .jpeg y .png)"),
      ],
    altaPlan: [
      body('plan')
        .notEmpty()
        .withMessage('Debe ingresar el nombre del Plan'),
      body('description')
        .notEmpty()
        .withMessage('El plan debe contener una descripción'),
      body('image')
      .custom((value, { req }) => {
        if (req.file) {
          const acceptedExtensions = [".jpg", ".jpeg", ".png"];
          const ext = path.extname(req.file.originalname);
          if (acceptedExtensions.includes(ext)) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      })
      .withMessage("La extensión de la imágen no es válida (extensiones permitidas: .jpg, .jpeg y .png)"),
    ],
  updateRecipe: [
    body('title')
    .notEmpty()
    .withMessage('El título es obligatorio'),
    body('description')
    .notEmpty()
    .withMessage('La descripción es obligatoria'),
    body('ingredients')
    .notEmpty()
    .withMessage('Los ingredientes de la receta son obligatorios'),
    body('preparation')
    .notEmpty()
    .withMessage('La preparación de la receta es obligatoria'),
    body('preparationtime')
    .notEmpty()
    .withMessage('El tiempo de preparación es obligatorio')
    .bail()
    .isNumeric()
    .withMessage('El tiempo de preparación tiene que ser numérico')
    .bail()
    .isLength({ min: 1 })
    .withMessage('El tiempo de preparación no puede ser menor a 1 minuto'),
    body('price')
    .notEmpty()
    .withMessage('El precio no puede estar vacío')
    .bail()
    .isNumeric()
    .withMessage('El precio tiene que ser numérico')
    .bail()
    .isLength()
    .withMessage('El precio no puede ser menor a $1'),
  ]
}