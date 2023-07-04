const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.index = (req, res) => {
    res.render('registroForm')
}

exports.registroPost = (req, res) => {
    var erros = [];

    if (!req.body) return;

    if (!req.body.nome || typeof req.body.nome === undefined || req.body.nome === '' || req.body.nome === null) {
        erros.push({
            texto: "Nome inválido"
        })
    }
    if (!req.body.email || typeof req.body.email === undefined || req.body.email === '' || req.body.email === null) {
        erros.push({
            texto: "E-mail inválido"
        })
    }
    if (!req.body.senha || typeof req.body.senha === undefined || req.body.senha === '' || req.body.senha === null) {
        erros.push({
            texto: "Senha inválido"
        })
    }

    if (req.body.senha.length < 4) {
        erros.push({
            texto: 'Não é permetido senha menor que 3 caracteres.'
        })
    }

    if (req.body.senha !== req.body.confirmaSenha) {
        erros.push({
            texto: 'As senhas são diferentes, tente novamente!'
        })
    }

    if (erros.length > 0) {
        req.flash('errors', erros[0].texto);
        res.redirect('/usuario/registro')

    } else {
        Usuario.prototype.buscarDadoUnico(req.body.email)
            .then((usuario) => {
                if (usuario) {
                    req.flash('errors', 'Já existe usuário com este e-mail no nosso sistema')
                    res.redirect('/usuario/registro');
                } else {

                    const novoUsuario = {
                        nome: req.body.nome,
                        email: req.body.email,
                        senha: req.body.senha
                    }

                    bcrypt.genSalt(10, (err, salt) => {
                        if(err) {
                            req.flash('errors', 'Houve um erro interno na hora de salvar o usuário')
                            res.redirect('/usuario/registro')
                        }

                        bcrypt.hash(novoUsuario.senha, salt, (err, hash) => {
                            if(err) {
                                req.flash('errors', 'Houve um erro interno na hora de salvar o usuário')
                                console.log('Erro ao tentar criar o hash da senha' + e);
                                res.redirect('/usuario/registro')
                            }

                            novoUsuario.senha = hash;
                            const user = new Usuario(novoUsuario)
                            user.register()
                            .then(() => {
                                req.flash('success', 'Usuário criado com sucesso');
                                res.redirect('/usuario/registro')
                            })
                            .catch((e) => {
                                req.flash('errors', 'Houve um erro interno ao tentar criar usuário, tente novamente!');
                                res.redirect('/')
                            })

                        })
                    })                    

                }

            })
            .catch((e) => {
                req.flash('errors', 'Houve um erro interno')
                res.redirect('/')
            })
    }

};

// controller de login
exports.login = (req, res) => {
    res.render('loginForm')
}

exports.loginPost = (req, res) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/usuario/login',
        failureFlash: true
    })(req, res)
}

exports.logout = (req, res) => {
    req.logout((err) => {
        req.flash('success', 'Deslogado com sucesso!')
        res.redirect('/')
    })
}