const express = require('express');
const route = express.Router();
const contatoController = require('./src/controllers/contatoController')
const homeController = require('./src/controllers/homeController')
const novoController = require('./src/controllers/novoController')

// HOME 

route.get('/', homeController.paginaInicial, homeController.daTchau)
route.post('/',homeController.trataPost)

// CONTACTS

route.get('/contact', contatoController.obterContato)



module.exports = route;