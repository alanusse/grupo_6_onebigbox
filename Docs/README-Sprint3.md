Nombre Del Proyecto: 
- ONEBIGBOX
---------------------------------------------
Integrantes:
- Facundo Martín 
- Agustín Lanusse
- Jesica Firus

---------------------------------------------
Pasos para la ejecución del proyecto:
1. Entrar Visual Code cargando: /grupo_6_onebigbox/site
2. Abrir un XMPP y presionar el botón "Start" de MySQL
3. Entrar a Workbench 
4. Correr el script: "grupo_6_onebigbox\sql\createTables.sql"
5. Correr el script: "grupo_6_onebigbox\sql\createUserAdmin.sql"
	5.1. Este script lo que va a hacer es insertar en la BD un usuario administrador, que es el que tiene los permisos para entrar en el backOffice del sitio.
6. Volver a Visual Code y ejecutar nmp install
7. Correr npm start
8. Para acceder a sitio abrir en el navegador: http://localhost:3000/
9. Para acceder al administrador: http://localhost:3000/admin

*** Se puede navegar por todo el sitio, toda la información del mismo está cargada desde la base de datos. 
---------------------------------------------
Funcionalidades En esta entrega
** Sprint 3 **
1. Implementar la entidad de usuarios
	a. Routers: grupo_6_onebigbox\site\src\routes\users.js
	b. Controlador: grupo_6_onebigbox\site\src\controller\usersController.js
	c. Vistas: grupo_6_onebigbox\site\src\views\user
	d. Directorio para imágenes: grupo_6_onebigbox\site\public\img\avatar
	e. Colección: BDONEBIGBOX.users

2. Implementar el registro de usuarios
	a. Router: grupo_6_onebigbox\site\src\routes\users.js
		* router.get('/register', userController.register);
		* router.post('/register', upload.single('avatar'), validator.register ,userController.registerPost); 
	b. Controlador: grupo_6_onebigbox\site\src\controller\userController
		* register
		* registerPost
	c. Validator: grupo_6_onebigbox\site\src\middlewares\validator
	d. Acceso desde la web: http://localhost:3000/user/register

3. Implementar el login de usuarios
	a. Router: grupo_6_onebigbox\site\src\routes\users.js
		* router.get('/', userController.login);
		* router.post('/', validator.login ,userController.loginIngresoDatos); 
	b. Controlador: grupo_6_onebigbox\site\src\controller\userController
		* login
		* loginIngresoDatos
	c. Validator: grupo_6_onebigbox\site\src\middlewares\validator
	d. Acceso desde la web: http://localhost:3000/user
	
4. (Opcional) Implementar la función de recordar al usuario
	a. Validator: grupo_6_onebigbox\site\src\middlewares\userSession
	
5. Implementar rutas de huéspedes y de usuarios
	a. Rutas accesibles sin loguin:  http://localhost:3000
	b. Rutas accesibles únicamente con login: http://localhost:3000/admin
	
6. Implementar logout del sitio.
	a. Controlador: grupo_6_onebigbox\site\src\controller\userController
		* logout


HOME
- Menú 
-- LOGO -> http://localhost:3000/
-- PLANES -> http://localhost:3000/planes
--- PRODUCTO -> http://localhost:3000/planes/detail/
-- RECETAS -> http://localhost:3000/recetas
-- COMO FUNCIONA? -> http://localhost:3000/howtouse
-- NOSOTROS -> http://localhost:3000/nosotros
-- LOGIN -> http://localhost:3000/user
--- REGISTRO -> http://localhost:3000/user/register
-- CARRITO -> http://localhost:3000/cart


ADMIN
- http://localhost:3000/admin

---------------------------------------------
REDES SOCIALES
- mail:  contactoonebigbox@gmail.com
- Facebook: https://www.facebook.com/BigBox-106679291091844
- Instagram
- Twitter
- WhatsApp
