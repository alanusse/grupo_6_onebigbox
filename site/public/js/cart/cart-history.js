window.addEventListener('load', function(){

   let urlApi = 'http://localhost:3000/api/apiPurcharse/getPurcharses/';
   console.log(urlApi);

   let paramURL = window.location.href.split('/')[window.location.href.split('/').length-1];
   console.log(paramURL);
   //Me fijo si están solicitando todo el historial o es por usuario
   

   if (paramURL == 'history'){
       // Quiere decir que pidieron todo el historial, por  lo tanto en la visualización tengo que mostrar los usuarios

   }else{
       //Oculto el elemento ya que la pantalla va a mostrar el historial solo por un usuario
       document.querySelector(".admin-list h2").style.visibility = 'hidden';
       urlApi = urlApi + paramURL;
       console.log(urlApi)
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
            purchase += '<h3>Monto Compra: ' + element.total + '</h3>';
            purchase += '<h3>Fecha Compra: ' + element.createdAt + '</h3> </div> </div> </div>';
            document.querySelector('.admin-list').innerHTML += purchase;
             
         });
     }else{
        console.log('Tiene Errores')
     }



   });
    
})