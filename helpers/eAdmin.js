module.exports = {
    eAdmin: function(req, res, next) {
        if(req.isAuthenticated() && req.user.eAdmin == 1){
            return next();
        }

        req.flash('errors', 'Você precisa ser um Admin');
        res.redirect('/')
    }
}