
const controller ={
    root: (req, res) =>{
    
        return res.render('cart');
    },
    agregarAlCarrito: (req, res) => {
        
        return res.redirect('/cart');
    }

    
 

};

module.exports = controller;