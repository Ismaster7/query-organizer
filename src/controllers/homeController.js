const Contato = require('../models/TaskModel')

exports.paginaInicial = (req, res, next)=>{
    res.render('index.ejs')
    next()
   
}






const HomeModel = require('../models/HomeModel')

// Criando um banco de dados do zero
// HomeModel.create({
//     title: "Titulo da aplicação",
//     descricao: 'Descrição do que foi inserido'  
// }).then(dados =>console.log(dados)).catch(e => console.log(e))

//


 /*`<form action="/" method="post">
            <input type="text" name="" id="" placeholder="Text here">
            <input type="submit">
        </form>`*/