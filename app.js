require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
 .then(()=>{
    app.emit('pronto');
    console.log("Agora a conexão ocorreu");
})
.catch(e=> console.log("Erro " + e));


const path = require('path')
const routes = require('./routes')
const helmet = require('helmet')
app.use(helmet())
const {myMiddleware} = require('./src/middleware/myMiddleware')
app.use(myMiddleware) //para utilizar middlewares. Necessario antes ter criado a variavel que apnto para o middleware especifico
app.use(express.urlencoded({extended: true})); // para poder utilizar os parametros de requisição, como req.body ou req.params
app.use(routes);
app.use(express.static(path.join(__dirname, "public"), { type: "text/css" }));
//app.use(express.static(path.resolve(__dirname, 'public')))
app.set('views', path.resolve(__dirname,'src','views'))
app.set('view engine', 'ejs');







// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/',(req, res)=>{
//     res.sendFile(path.join(__dirname,'public', 'index.html'))
// })
app.on('pronto', ()=>{
    app.listen(3000, ()=>{
        console.log('Servidor disponível em http://localhost:3000');
    })
})
