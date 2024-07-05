const express = require('express');
const route = express.Router();
const contatoController = require('./src/controllers/contatoController')
const homeController = require('./src/controllers/homeController')
const novoController = require('./src/controllers/novoController')
const loginController = require('./src/controllers/loginController')
// HOME 

route.get('/', homeController.paginaInicial)
//route.post('/',homeController.trataPost)

route.get('/register/index', ((req, res, next)=>{
    loginController.loginInitialPage(req, res, next, 'cadaster')
}))
route.get('/login/index', ((req, res, next)=>{
    loginController.loginInitialPage(req, res, next, 'login')
}))

route.post('/login/login', loginController.login)
route.post('/register/cadaster', loginController.register)

// CONTACTS

route.get('/contact', contatoController.obterContato)



module.exports = route;