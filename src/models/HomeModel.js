const mongoose = require('mongoose')

const HomeSchema = new mongoose.Schema({
    title: {type: String, required: true},
    descricao: {type: String}
})

const HomeModel = mongoose.model('Home', HomeSchema);

module.exports = HomeModel;