require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING)
.then(() => {
    app.emit('pronto');
    console.log('Conectado com sucesso!');
}).catch(e => console.log(e));

const route = require('./routes');
const path = require('path');
const {middlewareModelo} = require('./src/middlewares/middleware')

app.use(express.urlencoded({extended: true}));
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(middlewareModelo);
app.use(route);

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Running server in port 3000...');
        console.log('http://localhost:3000');
    })
})
