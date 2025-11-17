const express = require('express');
const route = express.Router();
const {initialPage, enviaFormulário} = require('./src/controllers/homeController');

route.get('/', initialPage);
route.post('/', enviaFormulário);

module.exports = route