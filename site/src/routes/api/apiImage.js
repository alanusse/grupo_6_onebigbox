var express = require('express');
var router = express.Router();

const imageController = require('../../controller/api/dashboard/apiGetImage');


//Routeador para obtener la imagen
//Para obtener una imagen voy a pasarle el tipo y el nombre
router.get('/:type/:name', imageController.getImage);


module.exports = router;