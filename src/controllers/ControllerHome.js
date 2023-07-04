const Postagem = require('../models/ModelPostagem')
const Categorias = require('../models/ModelAdmin');

exports.index = (req, res) => {
    Postagem.prototype.buscarDados()
    .then((postagens) => {
        res.render('index', {postagens: postagens})
    })
    .catch((e) => {
        req.flash('erros', 'Houve um erro interno');
        res.redirect('/404')
    })
}

exports.postagem = (req, res) => {
     Postagem.prototype.buscarUnicoDado(req.params.slug)
     .then((postagens) => {
        if(postagens) {
            res.render('postagemIndex', {postagens: postagens});
        } else {
            req.flash('errors', 'Esta postagem não existe.')
            res.redirect('/')
        }
     })
     .catch((e) => {
        req.flash('errors', 'Houve um erro interno.')
        res.redirect('/')
     })
}

exports.categorias = (req, res) => {
    Categorias.prototype.buscarDados()
    .then((categorias) => {
        if(categorias) {
            res.render('categoriasIndex', {categorias: categorias})
        } else {
            req.flash('errors', 'Não existe nenhuma categoria.');
            res.redirect('/');
        }
    })
    .catch((e) => {
        req.flash('errors', 'Houve um erro interno.');
        res.redirect('/')

    })
}

exports.AllPostagensDaCategoria = (req, res) => {
    Categorias.prototype.buscarUnicoDado(req.params.slug)
    .then((categoria) => {
        if(categoria) {
            Postagem.prototype.buscarPostagemEspecifica(categoria)
            .then((postagem) => {
                res.render('postagensEspecificas', {categorias: categoria, postagens: postagem})
            })
            .catch((e) => {
                req.flash('errors', 'Houve um erro ao listar os posts.');
                res.redirect('/')
            })
        } else {
            req.flash('errors', 'Essa categorias não existe.');
            res.redirect('/')
        }
    })
    .catch((e) => {
        req.flash('errors', 'Houve um erro interno.');
        res.redirect('/')
    })
}