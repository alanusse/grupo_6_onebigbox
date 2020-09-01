window.addEventListener('load', function(){
    
   
    let cantidades = document.querySelectorAll('.cart-items-list');

    //Recorro todo el array
    cantidades.forEach(element => {     
        //Lo que yo necesito es:
        // Id del ítem: ('item-delete'); -> Para sacar el número: idItemDelete.href.split('/')[idItemDelete.href.split('/').length-1];
        // El precio: ('item-unit-price') ->
        // La cantidad: ('item-quantity')
  
        //Tomo todas las cantidades de cada uno de los items de la lista
        cantidad = element.querySelector("#item-quantity");
        // Agrego el evento para detectar cuando cambia el dato
        cantidad.addEventListener('focusout', function(evento){
    
            //Acá obtengo el precio
            let precio = element.querySelector('#price-number');
            //Acá tengo ('item-delete')
            let idItem = document.getElementById("itemId").value;
            //URL de la API
            let apiUrl = 'http://localhost:3000/api/cart/updateCartById';

            // Armo el objeto literal que le envío por POST a la API
            let itemData = {
                idItem : idItem,
                recipeCant: cantidad.value,
                itemPrice: precio.innerHTML
            }

            fetch(apiUrl, {
                    method: 'post',
                    body: JSON.stringify(itemData),
                    headers:{
                        'Content-Type': 'application/json; charset=utf-8'
                    }
            })
            .then(res => res.json())
            .then(data => {
                if(data.meta.hasErrors){
                    let ulErrors = document.querySelector('.errors-front');
                    console.log(ulErrors);
                    ulErrors.innerHTML = ''
                    ulErrors.style.display = 'block';
                    data.data.errors.forEach(error => {
                        ulErrors.innerHTML += `<li style="color: #fff; list-style: disc; margin-left: 20px; font-size: 14px;">${ error.msg }</li>` 
                    })
                } else {
                    // Si la API no devuelve error, actualizo el dato en la página
                    console.log('Dato Actualizado');
                    //Actualizo el dato del Subtotal
                    let subtotal = precio.innerHTML * cantidad.value;
                    // toFixed(2) -> Se usa para indicar que dos dígitos son decimales 
                    element.querySelector("#sub-price-number").innerHTML = subtotal.toFixed(2);
                    
                    //Tengo que recorrer los items para 
                    let subtotalCart = 0;
                    cantidades.forEach(e => {     
                        console.log(e.querySelector("#sub-price-number"));
                        subtotalCart += parseFloat(e.querySelector("#sub-price-number").innerHTML);
                    })
                    console.log(subtotalCart);
                    document.getElementById('total-purchase').innerHTML = 'Total: $' + subtotalCart.toFixed(2);    
                }
            })
        });
    })
})