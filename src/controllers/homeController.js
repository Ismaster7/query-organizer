exports.paginaInicial = (req, res, next)=>{
    res.render('index',{batata: "Eu gosto de batata", arroz: "eu gosto de arroz"})
    next()
   
}

exports.trataPost = (req,res)=>{
    res.send(req.body)
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