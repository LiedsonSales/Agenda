const express = require('express');
const app = express();
const route = require('./routes');
const path = require('path');
const {middlewareModelo} = require('./src/middlewares/middleware')

app.use(express.urlencoded({extended: true}));
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(middlewareModelo);
app.use(route);

app.listen(3000, () => {
    console.log('Running server in port 3000...');
    console.log('http://localhost:3000');
})
