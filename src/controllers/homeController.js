exports.initialPage = (req, res) => {
    res.render('index');
}

exports.enviaFormulário = (req, res) => {
    res.send(req.body.cliente)
}