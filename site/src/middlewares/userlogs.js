const fs = require('fs');
const path = require('path');

function userLogs(req, res, next){
        //Función que loguea las rutas por las que accede un usuario
        let rutaAccedida = '\n El usuario ingresó a la ruta: ' + req.path;
       
        let ubicacionArchivo = path.join(__dirname, '../logs/userlogs.txt');
        
        fs.appendFileSync(ubicacionArchivo, rutaAccedida);
        next();
}
module.exports = userLogs;
