const Contato = require('../models/contatoModel');

exports.contato = (req, res) => {
    res.render('contato', {
        contato: {}
    });
}

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        // verifica se o formulário foi preenchido corretamente e mostra na tela o que precisa ser feito
        if(contato.errors.length > 0) {
            console.log(contato.errors);
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato/index'));
            return
        }

        // se estiver tudo certo, registra o contato na base de dados e envia o formulário para a base de dados
        req.flash('success', 'Contato registrado com sucesso.');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
}

exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render('404');

    const contato = await Contato.buscaPorId(req.params.id);
    if(!contato) return res.render('404');

    res.render('contato', {contato})
}

exports.edit = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);

        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato/index'));
            return
        }
    
        req.flash('success', 'Contato editado com sucesso.');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
    
}