const db = require('../database/models');

const log = (req, res, next) => {
    
    res.locals.user = false; // Inicializo la variable en FALSE para que por defecto sea false
    
    console.log('Estoy en el middleware de session y me llaman de: ' + req.url);
    console.log('El contenido de req.session.user es: '+ req.session.user);
    console.log('El contenido de la cookie es: ' + req.cookies.email)
    // Valido si está logueado o no
    if (req.session.user){
        res.locals.user = req.session.user; // Le doy a la variable todos los datos que tiene guardado session
        return next();
    }else if(req.cookies.email){
        
        db.Users.findOne({
            where: {email:req.cookies.email}
        })
        .then(function(user){
            console.log(user);
            console.log('holaaaassnnsssaa');
            //console.log(res.locals);
            delete user.password; 
            req.session.user = user.dataValues; // Guardo al usuario en sesión
            res.locals.user = user.dataValues; // Guardo los datos del usuario en la variable Locals para que sean visibles por la vista
            console.log('Entró en la asignación de valores');
            console.log('El contenido de req.session.user es: '+ req.session.user);
            console.log('El contenido de la cookie es: ' + req.cookies.email)
            console.log(res.locals);
            console.log(res.locals.user);
        })
        .catch(err => console.log(err))
    
         return next();
    }else{
        //Si no está logueado, y no tiene cuenta, ni nada, le digo que continúe
        return next();
    }
}
module.exports = log;
