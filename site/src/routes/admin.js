var express = require('express');
var router = express.Router();

const multer = require('multer');
const path = require('path');
const validator = require('../middlewares/validator');



// Copio el código del multer
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        if (req.url == '/recetas/abm-recetas-alta'){
            console.log ('La URL donde estoy parado es: ' + req.url);
            cb(null, path.resolve(__dirname+ '../../../public/img/recetas'))
        }else{
            cb(null, path.resolve(__dirname+ '../../../public/img/planes'))
        }
            
    },
    filename: function (req, file, cb) {
        if (file){
          cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
        }else{
          cb(null, '' + '-' + Date.now()+path.extname('default.png'))
        }
      }
    })
  let upload = multer({ 
    storage: storage,
  
    fileFilter: (req, file, cb) => {
      const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
      const ext = path.extname(file.originalname);
      if(!acceptedExtensions.includes(ext)){
        req.file = file;
      }
      cb(null, acceptedExtensions.includes(ext));
    }
  
  });

// ** Código de multer

// ************ Controller Require ************
const adminController = require('../controller/adminController');
//Routers de los Planes
router.get('/planes', adminController.planes);
router.get('/planes/abm-planes-alta', adminController.altaPlan);
router.post('/planes/abm-planes-alta', upload.single('image'), validator.altaPlan, adminController.registrarPlan);


//Routers de las Recetas
router.get('/', adminController.root);
router.get('/recetas', adminController.recetas);
router.get('/recetas/abm-recetas-alta', adminController.altaReceta);
router.get('/recetas/abm-recetas-modificacion/:id', adminController.modificarRecetaGet);

router.post('/recetas/abm-recetas-alta',upload.single('image'), validator.altaReceta, adminController.registrarReceta);
router.post('/recetas/abm-recetas-modificacion/:id', validator.updateRecipe, adminController.modificarRecetaPost);
router.post('/recetas/eliminar-receta/:id', adminController.eliminarRecetaPost);


module.exports = router;
