exports.middlewareModelo = (request, response, next) => {
    console.log('middleware modelo funcionando...');
    console.log(request.body)
    next();
}

exports.checkCsrfError = (error, request, response, next) => {
    if (error) {
        return response.send('404');
    }

    next()
}

exports.csrfMiddleware = (request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
}