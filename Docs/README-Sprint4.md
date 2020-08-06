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
** Sprint 4 **
1. Diagrama de base de datos: "\grupo_6_onebigbox\Docs" -> DER
2. Script de creación de estructura de base de datos
	a. Script: "grupo_6_onebigbox\sql\createTables.sql"
3. (Opcional) Script de población de base de datos
	a. script para la creación de un usuario: "grupo_6_onebigbox\sql\createUserAdmin.sql"
	b. script para la creación de Planes: "grupo_6_onebigbox\sql\insertPlans.sql"
	b. script para la creación de Recetas: "grupo_6_onebigbox\sql\insertsRecipes.sql"
4. Creación de carpeta Sequelize y archivos de modelos
	* Carpeta: "grupo_6_onebigbox\site\src\database"
5. CRUD
	* Contolador: "\grupo_6_onebigbox\site\src\controller\adminController"
	* Router: "\grupo_6_onebigbox\site\src\routes\admin"
	* Vistas: "grupo_6_onebigbox\site\src\views\admin"
	

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
