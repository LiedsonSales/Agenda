exports.index = (req, res) => {
    res.render('login');
}

exports.register = (req, res) => {
    res.send(req.body);
}

exports.login = (req, res) => {
    res.send('cadastro');
}