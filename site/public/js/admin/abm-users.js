window.addEventListener('load', function(){
    //Agrego el evento para que escuche al terminar de cargar la página
    console.log('Todos los recursos se han cargado');
    
    let urlAllUser = 'http://localhost:3000/api/admin/users';

    // Capturo evento en: abm-users-list
    let btnEliminar = document.querySelectorAll('.btn-eliminar');
    btnEliminar.forEach(element => {     
        console.log(element);
        element.addEventListener('submit', function(event){
            var check = confirm("¿Estás seguro que quieres eliminar el usuario?");
            console.log(check);
            if (check == true){
                return true;
            }else{
                event.preventDefault(); // Esto hace que no se envíe el formulario
                return false;
            }
       });
    });

   
})