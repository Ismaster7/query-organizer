
exports.myMiddleware = (req, res, next)=>{
    res.locals.errors = req.flash('errors')
    res.locals.sucess = req.flash('sucess')
    res.locals.user = req.session.user;
    next()
}
