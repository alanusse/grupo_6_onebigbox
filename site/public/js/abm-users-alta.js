window.addEventListener('load', function(){
    //Agrego el evento para que escuche al terminar de cargar la página
    console.log('Todos los recursos se han cargado');
    let btnEliminar = document.querySelectorAll('.btn-eliminar');

    btnEliminar.forEach(element => {
        
        console.log(element);
        element.addEventListener('click', function(){
            var check = confirm("¿Estás seguro que quieres eliminar esto?");
            console.log(element);
            if (check == true){
                element.action='/admin/users/abm-users-eliminar/user.id/user.email %>';
            }else{
                return false;
            }
       });

    });
// <script src="/js/abm-users-alta.js"></script>
})