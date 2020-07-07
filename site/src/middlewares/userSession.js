module.exports = function (req, res, next) {
    if(typeof req.cookies.email !== 'undefined' && typeof req.session.email === 'undefined') {
        req.session.email = req.cookies.email;
    }
    next();
};