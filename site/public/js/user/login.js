window.addEventListener('load', function(){

    console.log('Todos los objetos cargados');

    //Capturo el formulario
    let formLogin = document.querySelector('form');

    //Agrego el evento submit para capturar el clicl
    formLogin.addEventListener('submit', function(evento){
        
        //Guardo en la variable la dirección de la API
        let url = 'http://localhost:3000/api/user/validatorLogin';

        let userData = {
            email :  document.querySelector('#email').value,
            password:  document.querySelector('#password').value
        }
        evento.preventDefault();
        console.log(userData);
        fetch(url, {
                method: 'post',
                body: JSON.stringify(userData),
                headers:{
                    'Content-Type': 'application/json; charset=utf-8'
                }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.meta.hasErrors){
                let ulErrors = document.querySelector('.errors-front');
                ulErrors.innerHTML = ''
                ulErrors.style.display = 'block';
                data.data.errors.forEach(error => {
                    ulErrors.innerHTML += `<li style="color: #fff; list-style: disc; margin-left: 20px; font-size: 14px;">${ error.msg }</li>` 
                })
            } else {
                formLogin.submit()
            }
        })
    })

})