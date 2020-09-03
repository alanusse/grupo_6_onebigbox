const db = require('../database/models');

const log = (req, res, next) => {
    
    res.locals.user = false; // Inicializo la variable en FALSE para que por defecto sea false

    // Valido si está logueado o no
    if (req.session.user){
        res.locals.user = req.session.user; // Le doy a la variable todos los datos que tiene guardado session
        return next();
    }else if(req.cookies.email){
        
        db.Users.findOne({
            where: {email:req.cookies.email}
        })
        .then(function(user){
              
            delete user.password; 
            req.session.user = user.dataValues; // Guardo al usuario en sesión
            res.locals.user = user.dataValues; // Guardo los datos del usuario en la variable Locals para que sean visibles por la vista
            return next();
        })
        .catch(err => console.log(err))
    }else{
        //Si no está logueado, y no tiene cuenta, ni nada, le digo que continúe
        return next();
    }
}
module.exports = log;
