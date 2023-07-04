const mongoose = require('mongoose');

const SchemaPostagem = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categorias',
    },
    date: {
        type: Date,
        default: Date.now,
    }

});

const modelSchema = mongoose.model('postagens', SchemaPostagem);

class Postagem {
    constructor(body) {
        this.body = body;

    }
    async register() {
        if (!this.body) return;
        return (await modelSchema.create(this.body)).save();

    }

    async buscarDados() {
        const postagens = await modelSchema.find().populate('categoria').sort({
            date: -1
        })
        return postagens;
    }

    async buscarDadosPeloId(id) {
        const postagens = await modelSchema.findById(id)
        return postagens;
    }

    async update(id, body) {
        const localizarPostagem = await modelSchema.findById(id);
        const postagens = await modelSchema.updateOne(localizarPostagem, body, {
            new: true
        })
        return postagens;
    }

    async delete(id) {
        if(!id) return ;
        const localizarPostagem = await modelSchema.findById(id);
        const postagens = await modelSchema.deleteOne(localizarPostagem)
        return postagens

    }

    async buscarUnicoDado (params) {
        const dados = await modelSchema.findOne({slug: params})
        return dados
        
    }

    async buscarPostagemEspecifica (categoria) {
        const postagens = await modelSchema.find({categoria: categoria})
        return postagens
    }
}

module.exports = Postagem;