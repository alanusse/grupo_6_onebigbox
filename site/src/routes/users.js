var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************
const userController = require('../controller/userController');
// ************ Middlewares ************
const validator = require('../middlewares/validator');


// Copio el código del multer
let storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname+ '../../../public/img/avatar'))
  },
  filename: function (req, file, cb) {
    console.log(file);
    console.log(req.body.avatar);
    if (file){
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }else{
      cb(null, '' + '-' + Date.now()+path.extname('default.png'))
    }
  }
})
 
let upload = multer({ storage: storage })

//  Routeador del login
router.get('/', userController.login);
router.post('/', validator.login ,userController.loginIngresoDatos); 


// Routeador del Register
router.get('/register', userController.register);
router.post('/register', upload.single('avatar'), validator.register ,userController.registerPost); 


module.exports = router;
