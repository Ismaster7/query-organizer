const express = require('express');
const route = express.Router();
const contatoController = require('./src/controllers/contatoController')
const homeController = require('./src/controllers/homeController')
const novoController = require('./src/controllers/novoController')
const loginController = require('./src/controllers/loginController')
// HOME 

route.get('/', loginController.loginInitialPage)
route.post('/',homeController.trataPost)

//route.get('/login', loginController.loginInitialPage)

// CONTACTS

route.get('/contact', contatoController.obterContato)



module.exports = route;