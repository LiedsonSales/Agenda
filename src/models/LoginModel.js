const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    titulo: {type: String, require: true},
    descricao: String
});

const LoginModel = mongoose.model('Login 05', LoginSchema);

class Login {
    
}

module.exports = Login