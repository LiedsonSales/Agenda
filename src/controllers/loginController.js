const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    res.render('login');
}

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() { // salva a sessão
                return res.redirect('/login/index'); //redireciona para a página de login com os erros
            });
            return;
        } 

        req.flash('success', 'Seu usuário foi criado com sucesso');
            req.session.save(function() { // salva a sessão
                return res.redirect('/login/index'); //redireciona para a página de login com os erros
            });
        } catch(e) {
            console.log(e);
            return res.render('404');
        }
}