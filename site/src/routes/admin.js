var express = require('express');
var router = express.Router();

const multer = require('multer');
const path = require('path');
const validator = require('../middlewares/validator');
const adminCheck = require('../middlewares/adminCheck');

// JS -> DESCOMENTAR!!!!
router.use(adminCheck);

// Copio el código del multer
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('Estoy en el multer y la URL es:' + req.url );
        
        let ingredientes = req.url.split('/');
        //Me paro en la primera posición que es la que contiene donde estoy parado, si en recetas o planes
        if (ingredientes[1] == 'recetas') {
            cb(null, path.resolve(__dirname+ '../../../public/img/recetas'))
        }else if (ingredientes[1] == 'planes'){
            cb(null, path.resolve(__dirname+ '../../../public/img/planes'))
            cb(null, path.resolve(__dirname+ '../../../../../../ProyectoFinalDashboard/dashboard/public/images/planes'))
        }else{
          cb(null, path.resolve(__dirname+ '../../../public/img/avatar'))
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

router.get('/', (req, res) => res.redirect('/admin/planes'));

//Routers de admins
router.get('/login', (req, res) => res.render('admin/admin-login'));
router.post('/login', validator.adminLogin, adminController.adminLogin);

//Routers de los Planes
router.get('/planes', adminController.planes);
router.get('/planes/abm-planes-alta', adminController.altaPlanGet);
router.get('/planes/abm-planes-modificacion/:id', adminController.modificarPlanGet);

router.post('/planes/abm-planes-alta', upload.single('image'), validator.altaPlan, adminController.altaPlanPost);
router.post('/planes/abm-planes-modificacion/:id', upload.single('image'), validator.updatePlan, adminController.modificarPlanPost);
router.post('/planes/eliminar-plan/:id', adminController.eliminarPlanPost);

//Routers de las Recetas
router.get('/recetas', adminController.recetas);
router.get('/recetas/abm-recetas-alta', adminController.altaRecetaGet);
router.get('/recetas/abm-recetas-modificacion/:id', adminController.modificarRecetaGet);

router.post('/recetas/abm-recetas-alta', upload.single('image'), validator.altaReceta, adminController.altaRecetaPost);
router.post('/recetas/abm-recetas-modificacion/:id', upload.single('image'), validator.updateRecipe, adminController.modificarRecetaPost);
router.post('/recetas/eliminar-receta/:id', adminController.eliminarRecetaPost);


// Usuarios
router.get('/users', adminController.listarUsuarios);
router.get('/users/abm-users-modificacion/:id', adminController.editarUsuario);
//router.post('/users/abm-users-modificacion/:id',upload.single('avatar'), validator.updateUser, adminController.editarUsuarioBD);
router.post('/users/abm-users-modificacion/:id',upload.single('avatar'), validator.updateUser, adminController.editarUsuarioBD);
router.post('/users/abm-users-eliminar/:id/:mail?', adminController.eliminarUsuarioBD);

router.get('/users/abm-users-alta', adminController.altaUsuario);
router.post('/users/abm-users-alta', upload.single('avatar'), validator.createUser, adminController.altaUsuarioBD);


module.exports = router;
