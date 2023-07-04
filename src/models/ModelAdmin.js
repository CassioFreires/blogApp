const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    tema: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})
const modelSchema = mongoose.model('categorias', Schema);

class Categorias {
    constructor(body) {
        this.body = body
        this.categoria = null;

    }

    async register() {
        if (!this.body) return
        this.newBody = await modelSchema.create(this.body)
    }

    async buscarDados() {
        const dados = await modelSchema.find({}).sort({
            date: -1
        })
        return dados;
    }

    async buscaDadosPeloId(id) {
        const dados = await modelSchema.findById(id)
        this.categoria = dados;
        return dados
    }

    async editarDados(id, body) {
        const dados = await modelSchema.findById(id)
        const update = await modelSchema.updateOne(dados, body, {
            new: true
        })
        return update;
    }

    async delete(id) {
        if(typeof id !== 'string') return;
        
        const filter = await modelSchema.findById(id)
        const dados = await modelSchema.deleteOne(filter)
        return dados;
    }

    async buscarUnicoDado(slug) {
        const categoria = await modelSchema.findOne({slug: slug})
        return categoria
    }
}

module.exports = Categorias;