const express = require('express');
const route = express.Router();
const tasksController = require('./src/controllers/tasksController');
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const {loginRequired} = require('./src/middleware/myMiddleware');

// HOME 

route.get('/',homeController.paginaInicial)

// Rotas de login
route.get('/register/index', ((req, res, next)=>{
    loginController.loginInitialPage(req, res, next, 'cadaster')
}))
route.get('/login/index', ((req, res, next)=>{
    loginController.loginInitialPage(req, res, next, 'login')
}))
route.post('/login/login', loginController.login)
route.post('/register/cadaster', loginController.register)
route.get('/login/logout', loginController.logout);
// CONTACTS

route.get('/tasks/index', tasksController.index)
route.post('/tasks/register', loginRequired, tasksController.register)


module.exports = route;