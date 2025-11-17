exports.middlewareModelo = (request, response, next) => {
    console.log('middleware modelo funcionando...');
    console.log(request.body)
    next();
}

exports.checkCsrfError = (error, request, response, next) => {
    if (error && 'EBADCSRFTOKEN' == error.code) {
        return response.send('404');
    }
}

exports.csrfMiddleware = (request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
}