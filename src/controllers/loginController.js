const Login = require("../models/LoginModel");



exports.loginInitialPage = (req, res, next, page) =>{
    if(req.session.user){
        return res.render('logado.ejs')
    }
    console.log('salvo como: ' + page)
    return res.render('login.ejs',{screen: page})
}


exports.register = async function (req, res){

   try{
    const login = new Login(req.body);
    await login.register();
    console.log('retornou do register()')
    if(login.errors.length > 0){

        req.flash('errors', login.errors);
        req.session.save(function(){
        console.log('salvou a sessão e agr vai voltar pro index')
        return res.redirect('/register/index');
            
        })
       return; 
    }
        req.flash('sucess', 'Seu Cadastro foi criado com sucesso!');
        req.session.save(function(){
        console.log('salvou a sessão e agr vai voltar pro index')
        return res.redirect('/register/index');
    })
   }catch(e){
    console.log(e)
    res.render('404.ejs')
   }
}


exports.login = async function (req, res){
    try{
     const login = new Login(req.body);
     await login.login();
     console.log('retornou do register()')
     if(login.errors.length > 0){
 
         req.flash('errors', login.errors);
         req.session.save(function(){
         console.log('salvou a sessão e agr vai voltar pro index')
         return res.redirect('/login/index');
             
         })
        return; 
     }
         req.flash('sucess', 'Logou com Sucesso!');
         req.session.user = login.user;
         req.session.save(function(){
         console.log('salvou a sessão e agr vai voltar pro index')
         return res.redirect('/');
     })
    }catch(e){
     console.log(e)
     res.render('404.ejs')
    }
 }

 exports.logout = (req, res)=>{
    req.session.destroy();
    res.redirect('/');
 }
 


