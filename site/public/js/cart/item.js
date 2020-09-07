window.addEventListener('load', function(){


    function format(num, posiciones = 0) {
    
        {
            if (!num || num == 'NaN') return '-';
    
            if (num == 'Infinity') return '&#x221e;';
            num = num.toString().replace(/\$|\,/g, '');
            if (isNaN(num))
                num = "0";
            let sign = (num == (num = Math.abs(num)));
            num = Math.floor(num * 100 + 0.50000000001);
            let cents = num % 100;
            num = Math.floor(num / 100).toString();
            if (cents < 10)
                cents = "0" + cents;
            for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
                num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
            return (((sign) ? '' : '-') + num + ',' + cents);
        }
    }

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
            let precio = element.querySelector('#price-number').innerHTML;
            console.log(precio);
            //Acá tengo (el id del item)
            let idItem = element.querySelector("input[name='itemId']").value
            console.log(idItem);
            
            //Tomo la nueva cantidad de productos elegida por el usuario
            let newCant = element.querySelector(".item-quantity").value;
        
            //URL de la API
            let apiUrl = 'http://localhost:3000/api/cart/updateCartById';

            // Armo el objeto literal que le envío por POST a la API
            let itemData = {
                idItem : idItem,
                recipeCant: newCant,
                itemPrice: precio
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
                    let subtotal = parseFloat(precio) * newCant;
                    
                    // toFixed(2) -> Se usa para indicar que dos dígitos son decimales 
                    element.querySelector(".sub-price-number").innerHTML =  format(subtotal,2);
                    
                    //Tengo que recorrer los items para 
                    let subtotalCart = 0;
                    cantidades.forEach(e => {     
                        subtotalCart += parseFloat(e.querySelector(".sub-price-number").innerHTML);
                    })
                    document.getElementById('total-purchase').innerHTML = 'Total: $' + format(subtotalCart,2);
                    
                    
                    let totalRecetas = 0;
                    cantidades.forEach(element => { 
                       totalRecetas += Number(element.querySelector("#item-quantity").value);  
                    })
                    document.querySelector('h2').innerHTML = 'Cantidad de recetas: '+ totalRecetas;
                }
            })
        });
    })
})