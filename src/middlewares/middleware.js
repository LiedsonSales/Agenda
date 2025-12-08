exports.middlewareModelo = (request, response, next) => {
    response.locals.errors = request.flash('errors');
    response.locals.success = request.flash('success');
    response.locals.user = request.session.user;

    next();
}

exports.checkCsrfError = (error, request, response, next) => {
    console.log(error)
    if (error) {
        return response.render('404');
    }

    next();
}

exports.csrfMiddleware = (request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
}

exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'Você precisa fazer login');
        req.session.save(() => res.redirect('/'));
        return;
    }
    next();
}