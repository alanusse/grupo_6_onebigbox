window.addEventListener('load', function(){   
    // Capturo los eventos para validar los datos del alta  la modificación del Usuario

      // Hago una sola función que valide los caracteres especiales y luego la llamo en las diferentes casillas de texto
      function isValid (character){
        let caracEspeciales = ['+','|', '°', '#', '!', '"', '#', '$', '%', '&', '/', '(', ')', '=', '?', '¡', '¨', '*', '[', ']', ';', ':', '¿', '+', '{', '}', '.', '-', '_', "'"];
        if ( ( (!isNaN(character) || (caracEspeciales.includes(character) ) )&& (character !== ' ') ) ) {
           return false;
        }else{
            return true;
        }
    }
    // Función para mostrar por pantalla los errores
    function showError (msg){
        let ulErrors = document.querySelector('.errors-front');
        ulErrors.innerHTML = '';
        ulErrors.style.display = 'block';
        ulErrors.innerHTML += `<li style="color: #fff; list-style: disc; margin-left: 20px; font-size: 14px;">${ msg }</li>`;
    }

   /*** VALIDACIONES PARA EL INPUT DEL NOMBRE*/
    let txtName = document.querySelector('#name')
    // Capturo el evento de presionar el key para validar que no se ingresen números en el nombre
    txtName.addEventListener("keypress", function(evento){
    
        if (isValid(evento.key)){
            let ulErrors = document.querySelector('.errors-front');
            ulErrors.style.display = 'none';
        }else{
            evento.preventDefault();
            let msg = 'No es posible ingresar números o caracteres especiales en el nombre';
            showError(msg);
        }
    });
    //Hago invisible los errores cuando pierde el foto
    txtName.addEventListener("blur", function(evento){
        let ulErrors = document.querySelector('.errors-front');
        ulErrors.style.display = 'none';
    });

    /*** VALIDACIONES PARA EL INPUT DEL APELLIDO*/
    let txtLastname = document.querySelector('#lastname')
    // Capturo el evento de presionar el key para validar que no se ingresen números en el nombre
    txtLastname.addEventListener("keypress", function(evento){
        if (isValid(evento.key)){
            let ulErrors = document.querySelector('.errors-front');
            ulErrors.style.display = 'none';
        }else{
            evento.preventDefault();
            let msg = 'No es posible ingresar números o caracteres especiales en el Apellido';
            showError(msg);
        }
    });
    //Hago invisible los errores cuando pierde el foto
    txtLastname.addEventListener("blur", function(evento){
        let ulErrors = document.querySelector('.errors-front');
        ulErrors.style.display = 'none';
    });

    /*** VALIDACIONES PARA EL INPUT DE LA PASSWORD*/
    let impPassword = document.querySelector('#password')
    impPassword.addEventListener("blur", function(evento){

        if ((impPassword.value.length < 4) || (impPassword.value.length > 10)){
            evento.preventDefault();
            let msg = 'Campo Password mínimo 4 caracteres y máximo 10';      
            showError(msg);
        }
        else{
            let ulErrors = document.querySelector('.errors-front');
            ulErrors.style.display = 'none';
        }
    });
    let formSubmit = document.querySelector('form');

    formSubmit.addEventListener('submit', function(e){

        let url = 'http://localhost:3000/api/admin/user/validatorUpdate';
        //let id = window.location.href.split('/')[window.location.href.split('/').length-1];
        //console.log(id);
        let data = {
            id : window.location.href.split('/')[window.location.href.split('/').length-1],
            name: document.querySelector('#name').value,
            lastname: document.querySelector('#lastname').value,
            email: document.querySelector('#email').value,
            password:document.querySelector('#password').value
        }
        e.preventDefault();
        fetch(url, {
                method: 'post',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json; charset=utf-8'
                }
        })
        .then(res => res.json())
        .then(data => {
            if(data.meta.hasErrors){
                
                let ulErrors = document.querySelector('.errors-front');
                ulErrors.innerHTML = ''
                ulErrors.style.display = 'block';
                data.data.errors.forEach(error => {
                    ulErrors.innerHTML += `<li style="color: #fff; list-style: disc; margin-left: 20px; font-size: 14px;">${ error.msg }</li>` 
                })
            } else {
                formSubmit.submit()
            }
        })
       })
   })