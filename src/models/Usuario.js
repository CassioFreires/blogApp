const mongoose = require('mongoose');

const schemaUsuario = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    eAdmin: {
        type: Number,
        default: 0,
    },
    senha: {
        type: String,
        required: true
    }
});

const modelUsuario = mongoose.model('usuarios', schemaUsuario);

class Usuario {
    constructor(body) {
        this.body = body;
    }

    async register(){
         (await modelUsuario.create(this.body)).save()
    }

    async buscarDadoUnico(prop) {
        const user = await modelUsuario.findOne({email: prop});
        return user
    }

}

module.exports = Usuario;