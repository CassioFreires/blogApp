const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Usuario = require('../src/models/Usuario');

const modelUsuario = mongoose.model('usuarios');


module.exports = async function(passport) {

    // configuramos o passport aqui
    passport.use( new localStrategy({usernameField: 'email'}, (email, senha, done) => {

        modelUsuario.findOne({email: email})
        .then((usuario) => {
            if(!usuario){
                return done(null, false, {message: 'Esta conta não existe'})
            } 

            bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                if(batem) {
                    return done(null, usuario)
                } else {
                    return done(null, false, {message: 'Senha incorreta'})
                }
            })
        })
    }))

    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })


    passport.deserializeUser( async (id, done) => {
        await modelUsuario.findById(id)
        .then((usuario) => {
            done(null, usuario)
        })
        .catch((e) => {
            console.log(e);
        })
    })

}