module.exports = (req, res, next) => {
        
    if(req.session.admin) {
        if(req.url === '/login') {
            return res.redirect('/admin/planes');
        }
        return next();
    } else {
        if(req.url === '/login') {
            return next();
        }
        return res.redirect('/admin/login');
    }
};