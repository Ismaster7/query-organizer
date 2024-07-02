const path = require('path')
exports.postado = (req, res, next)=>{
    res.sendFile(path.resolve(__dirname, '..', 'views', 'novo.ejs'))
}