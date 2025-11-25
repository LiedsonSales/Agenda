const mongoose = require('mongoose');
const validator = require('validator');

const LoginSchema = new mongoose.Schema({
    email: {type: String, require: true},
    password: {type: String, require: true},
});

const LoginModel = mongoose.model('Login 05', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.user = null;
    };

    register() {
        this.valida();
    }

    valida() {
        this.cleanUp();
        // Validação
        // O email precisa ser válido
        if (!validator.isEmail(this.body.email)) this.erros.push('E-mail inválido'); 
        // A senha precisa ter entre 0 e 3
        if (this.body.password.lenght < 3 || this.body.password.lenght > 50) {
            this.erros.push('A senha precisa ter entre 3 e 50 caracteres');
        }
    }

    cleanUp() {
        for(const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Login