module.exports = {
    ensureAuth: function(req, res, next) {
        if(req.isAuthenticated()){
            return next();

        }
        req.flash('error', 'Please login to view this page');
        res.redirect('/users/login')
    }
}