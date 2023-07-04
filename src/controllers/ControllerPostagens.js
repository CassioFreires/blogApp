const Postagem = require('../models/ModelPostagem')
const Categoria = require('../models/ModelAdmin')

exports.index = async (req, res) => {
    await Postagem.prototype.buscarDados()
    .then((postagens) => {
        res.render('addPostagem', {postagens: postagens})
    })
    .catch((err) => {
        req.flash('errors', 'Houve um erro ao listar as postagens')
        res.redirect('/admin');
    })

}

exports.form = async (req, res) => {
    await Categoria.prototype.buscarDados()
        .then((categorias) => {
            res.render('postagensForm', {categorias: categorias, postagens: {}})
        })
        .catch((e) => {
            console.log(e);
        })
}

exports.postagemNova = async (req, res) => {
    if (!req.body) return;

    if(req.body.categoria === '0') {
        req.flash('errors', 'Categoria inválida, registre uma nova categoria');
        res.redirect('/admin');
        return
    }

    if (req.body.titulo === '' || req.body.descricao === '' || req.body.conteudo === '') {
        req.flash('errors', 'Falha ao tentar criar postagem, pois algum campo ficou em branco.')
        res.redirect('/admin/postagens')
        return
    }

    const novaPostagem = {
        titulo: req.body.titulo,
        slug: req.body.slug,
        descricao: req.body.descricao,
        conteudo: req.body.conteudo,
        categoria: req.body.categoria
        // parei aqu - aula salvando postagem no banco de dados
    }

    const postagem = new Postagem(novaPostagem)
    await postagem.register()
        .then((dados) => {
            req.flash('success', 'Postagem criada com sucesso!')
            res.redirect('/admin/postagens')
        })
        .catch((err) => {
            req.flash('errors', 'Falha ao tentar salvar postagem no banco de dados.')
            res.redirect('/admin/postagens')
        })

}

exports.filter = async (req, res) => {
    const dados = Postagem.prototype.buscarDados()
        .then((dados) => {
            res.render('listaDePostagens', {
                dados: dados
            })
        })
        .catch((e) => {
            req.flash('errors', 'Erro ao tentar exibir as postagens')
            res.redirect('/admin/postagens')
        })
}

exports.editar = async (req, res) => {
    Postagem.prototype.buscarDadosPeloId(req.params.id)
    .then((postagens) => {

        Categoria.prototype.buscarDados().then((categorias) => {
            res.render('editarPostagensForm', {categorias: categorias, postagens: postagens})
        }).catch((err) => {
            req.flash('errors', 'Houve um erro ao listar as categorias')
            res.redirect('/admin/postagens')
        })
    })
    .catch((err) => {
        req.flash('errors', 'Houve um erro ao carregar o fomulário de edição')
        res.redirect('/admin/postagens')
    })

}

exports.update = async (req, res) => {
    Postagem.prototype.update(req.body.id, req.body)
    .then((updatePostagens) => {
        req.flash('success', 'Atualização realizada com sucesso')
        res.redirect('/admin/postagens')
    })
    .catch((err) => {
        req.flash('errors', 'Houve um erro ao tentar atualizar os dados da postagem')
        res.redirect('/admin/postagens')
    })
}

exports.delete = async(req, res) => {
    Postagem.prototype.delete(req.params.id)
    .then((dados) => {
        req.flash('success', 'Postagem deletada com sucesso!')
        res.redirect('/admin/postagens')
    })
    .catch((e) => {
        req.flash('errors', 'Houve um erro ao tentar deletar a postagem!')
        res.redirect('/admin/postagens')
    })
}