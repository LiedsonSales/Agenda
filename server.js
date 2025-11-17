require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING)
.then(() => {
    app.emit('pronto');
    console.log('Conectado com sucesso!');
}).catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const route = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');

const {middlewareModelo} = require('./src/middlewares/middleware')

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'dhjak shkd',
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        mongoUrl: process.env.CONNECTIONSTRING
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(middlewareModelo);

app.use(route);

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Running server in port 3000...');
        console.log('http://localhost:3000');
    })
})
