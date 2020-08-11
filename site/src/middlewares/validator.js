const path = require('path');
const bcrypt = require('bcryptjs');
const { body } = require('express-validator');
const db = require('../database/models');

module.exports = {
    register: [
        body('name')
            .notEmpty()
            .withMessage('El nombre es obligatorio')
            .bail()
            .isLength({ min: 4 })
            .withMessage('El nombre debe tener un mínimo de 4 caracteres'),
        body('lastname')
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
              return db.Users.findOne({
                  where: {
                      email: value
                  }
              }).then(user => {
                if (user){
                  //Acá tengo el usuario encontrado en la base de datos. Por l cual, no podría registrarse con un mail existente
                  return Promise.reject('Usuario ya existe');
                }
              });
            }),  
        body('password')
            .notEmpty()
            .withMessage('La contraseña es obligatoria')
            .bail()
            .isLength( { min:4, max:10})
            .withMessage('La contraseña debe tener un mínimo de 4 y un máximo de 10 caracteres'),
        body("avatar")
            /* CODIGO PARA IMAGEN OBLIGATORIA
            .custom((value, { req }) => {
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
            .custom( function(value, {req}){
                return db.Users.findOne({
                    where: { email: value }
                })
                .then(user => {
                    if(user){
                      return (bcrypt.compareSync(req.body.password, user.password))|| Promise.reject('Email o contraseña Inválida');
                    }else{
                      return Promise.reject('Email no encontrado');
                    }
                })
            }),            
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
    updatePlan: [
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
    ],
    adminLogin: [
      body('email')
      .notEmpty()
      .withMessage('Debes ingresar un correo electrónico')
      .bail()
      .isEmail()
      .withMessage('El correo electrónico no es válido'),
      body('password')
      .notEmpty()
      .withMessage('Debes ingresar una contraseña')
      .bail()
      .isLength({ min: 4 })
      .withMessage('Ingresa una contraseña de almenos 4 caracteres')
    ],
    createUser:[
        body('name')
            .notEmpty()
            .withMessage('El nombre es obligatorio')
            .bail()
            .isLength({ min: 4 })
            .withMessage('El nombre debe tener un mínimo de 4 caracteres'),
        body('lastname')
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
              
              return db.Users.findOne({
                  where: {
                      email: value
                  }
              }).then(user => {
                if (user){
                  //Acá tengo el usuario encontrado en la base de datos. Por l cual, no podría registrarse con un mail existente
                  return Promise.reject('Usuario ya existe');
                }
              });
            }),  
        body('password')
            .notEmpty()
            .withMessage('La contraseña es obligatoria')
            .bail()
            .isLength( { min:4, max:10})
            .withMessage('La contraseña debe tener un mínimo de 4 y un máximo de 10 caracteres')
    ],
    updateUser:[
      body('name')
      .notEmpty()
      .withMessage('El nombre es obligatorio')
      .bail()
      .isLength({ min: 4 })
      .withMessage('El nombre debe tener un mínimo de 4 caracteres'),
      body('lastname')
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
        //Guardo el ID de esta manera para que en la API tome el id del formulario  cuando esta función es llamada desde el POST, lo saque de la URL
        let id = (req.body.id)? req.body.id : req.params.id;
        return db.Users.findByPk(id)
          .then(data => {
            if (data.dataValues.email != req.body.email){
              return db.Users.findOne({
                where: {email: value}
                })
                .then(user => {
                  if (user){
                  //Acá tengo el usuario encontrado en la base de datos. Por l cual, no podría registrarse con un mail existente
                    return Promise.reject('Usuario ya existe, por favor indique otro correo electrónico');
                  }else{
                    return false;
                  }

                });
            }else{
              return false;
            }
          })
      }),
  body('password')
      .custom((value, {req})=> {
        //Valido si hay datos en el campo contraseña y si éstos son mas de 4 caracteres
        if (req.body.password){
          return ((req.body.password.length)<4)? false: true
        }else{
          return true;
        }
      })
      .withMessage('La contraseña debe tener mínimo 4 caracteres'),
  body("avatar")
      /* CODIGO PARA IMAGEN OBLIGATORIA
      .custom((value, { req }) => {
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
  ]

}