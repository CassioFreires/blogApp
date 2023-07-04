const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const rotas = require('./router')
const session = require('express-session');
const flash = require('connect-flash');
const middleware = require('./src/middlewares/Middleware')
const passport = require('passport')
require('./config/auth')(passport)

const PORT = process.env.PORT || 8081;
const app = express();

// config bd
mongoose.connect('mongodb://127.0.0.1:27017/formulario_test', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.emit('pronto');
    console.log('Conectado ao servidor MongoDB');
})
.catch((e) => console.log(e));

// config session
app.use(session({
    secret: 'cursodenode',
    resave: true,
    saveUninitialized: true,
}));

// passport
app.use(passport.initialize())
app.use(passport.session())

// config flash_msg
app.use(flash());

// config o body do https
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// config pasta public
app.use(express.static(path.resolve(__dirname, './public')));


// config ejs
app.set('view engine', 'ejs');
app.set('views', './src/views')


app.use(middleware.Global)

app.get('/404', (req, res) => {
    res.send('Erro 404')
})

// config rotas
app.use(rotas)

app.on('pronto', () => {
    app.listen(PORT || 3000, () => console.log('Servidor WEB-HTTP rodando com sucesso!'))
})