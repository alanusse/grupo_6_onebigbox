module.exports = (req, res, next) => {
    
    if(typeof req.session.user !== 'undefined') {
        if(req.session.user.admin){
            console.log('El contenido de req.url es:' + req.url);
            if(req.url === '/login') {
                console.log('Va a redireccionar a: /admin/planes');
                return res.redirect('/admin/planes');
            }
            console.log('Va a redireccionar al primer next() -- con: req.url === /login');
            return next();
        } else {
            if(req.url === '/login') {
                console.log('Va a redireccionar al segundo next() -- con: req.url === /login');
                return next();
            }else{
                console.log('Va a redireccionar a: /admin/login');
                return res.redirect('/admin/login');
            }
        }
    }else{
        if(req.url === '/login') {
            console.log('Va a redireccionar al segundo next() -- con: req.url === /login');
            return next();
        }else{
            console.log('Va a redireccionar a: /admin/login');
            return res.redirect('/admin/login');
        }
    }    
};