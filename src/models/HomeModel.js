const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
    titulo: {type: String, require: true},
    descricao: String
});

const HomeModel = mongoose.model('Home 05', HomeSchema);

class Home {
    
}

module.exports = Home