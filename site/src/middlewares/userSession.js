const jsonModel = require('../models/jsonModel');
const usersModel = jsonModel('userDataBase');

const log = (req, res, next) => {
    
    res.locals.user = false; // Inicializo la variable en FALSE para que por defecto sea false
 
    // Valido si está logueado o no
    if (req.session.user){
        res.locals.user = req.session.user; // Le doy a la variable todos los datos que tiene guardado session
        
        return next();
    }else if(req.cookies.email){
        let user = usersModel.findBySomething(element => element.email == req.cookies.email);
        
        delete user.password; // Saco los datos sencibles
        req.session.user = user; // Guardo al usuario en sesión
        res.locals.user = user; // Guardo los datos del usuario en la variable Locals para que sean visibles por la vista
 
        return next();
    }else{
        //Si no está logueado, y no tiene cuenta, ni nada, le digo que continúe
        return next();
    }
}
module.exports = log;
