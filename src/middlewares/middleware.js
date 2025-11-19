exports.middlewareModelo = (request, response, next) => {
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