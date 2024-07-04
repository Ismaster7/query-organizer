const Login = require("../models/LoginModel");



exports.loginInitialPage = (req, res, next) =>{
    res.render('login.ejs')
}

exports.register = async function (req, res){
    console.log('cheguei até o inicio da função register')
   try{
    const login = new Login(req.body);
    await login.register();
    if(login.errors.length > 0){
        req.flash('errors', login.errors);
        req.session.save(function(){
            
            return res.redirect('/login/index');
        })
        
    }
    return
    
   }catch(e){
    console.log(e)
    res.render('404.ejs')
   }
}