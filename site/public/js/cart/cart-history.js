
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

   let urlApi = 'http://localhost:3000/api/apiPurcharse/getPurcharses/';

   let paramURL = window.location.href.split('/')[window.location.href.split('/').length-1];
   //Me fijo si están solicitando todo el historial o es por usuario
   if (paramURL == 'history'){
       // Quiere decir que pidieron todo el historial, por  lo tanto en la visualización tengo que mostrar los usuarios

   }else{
       //Oculto el elemento ya que la pantalla va a mostrar el historial solo por un usuario
       document.querySelector(".admin-list h2").style.visibility = 'hidden';
       urlApi = urlApi + paramURL;
       
   }
   fetch(urlApi)
   .then(function(response) {
     return response.json();
   })
   .then(function(jsonPurchaseHistory) {
     console.log(jsonPurchaseHistory);
    //Valido que no haya devuelto errores
     if (!jsonPurchaseHistory.meta.hasErrors){
         /* Tengo que Crear esta estructura y agregarla al HTML
          
         <div class="admin-item">
            <div class="admin-info">
               <div>
                    <h3>Fecha Compra: </h3>
                    <h3>Nro. Orden: </h3>
                    <h3>Total Compra:</h3>
                </div>
            </div>
        </div>
         
            
         */
        //let adminInfo = document.querySelector('.admin-info');

         jsonPurchaseHistory.data.forEach(element => {
            let purchase = '';
            purchase = '<div class="admin-item"> <div class="admin-info"> <div>' + '<h2>Nro. Orden: ' + element.orderNumber + '</h2>';
            purchase += '<h3>Monto Compra: ' + format(element.total,2) + '</h3>';
            purchase += '<h3>Fecha Compra: ' + element.createdAt + '</h3> </div> </div> </div>';
            document.querySelector('.admin-list').innerHTML += purchase;
             
         });
     }else{
        console.log('Tiene Errores')
     }



   });
    
})