require('dotenv').config();
const express = require('express');
const app = express();

const flash = require('connect-flash')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
 .then(()=>{
    app.emit('pronto');
    
})
.catch(e=> console.log("Erro " + e));

const sessionOptions = session({
    secret: 'iseldjfnskdjfalsddpqawkomlefd',
    resave: false,
    cookie:{
        maxAge: 1000*60*60*7,
        httpOnly: true
    },
    store: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING})

})
const path = require('path')
const routes = require('./routes')
const helmet = require('helmet')


app.use(sessionOptions);
app.use(flash())
app.use(helmet())
const {myMiddleware} = require('./src/middleware/myMiddleware')
app.use(myMiddleware) //para utilizar middlewares. Necessario antes ter criado a variavel que apnto para o middleware especifico
app.use(express.urlencoded({extended: true})); // para poder utilizar os parametros de requisição, como req.body ou req.params
app.use(routes);
app.use(express.static(path.join(__dirname, "public"), { type: "text/css" }));
app.use(express.static(path.join(__dirname, "public"), { type: "js" }));
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


 