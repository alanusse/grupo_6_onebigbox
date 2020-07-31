window.addEventListener('load', function() {
    console.log('Todos los recursos se han cargado');
    let eliminarPlan = document.getElementsByClassName('btn-eliminar');

    for (let i = 0; i < eliminarPlan.length; i++) {
        eliminarPlan[i].onclick = function() {
            var check = confirm("¿Estás seguro que quieres eliminar esto?");
                if (check == true) {
                    return true;
                }
                else {
                    return false;
                }
        };
    }

    
});

