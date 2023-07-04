const Categorias = require('../models/ModelAdmin')


exports.index = (req, res) => {
    res.render('categoriasForm', {
        dados: {}
    })
}

exports.post = async (req, res) => {

    if (req.body.tema === '' || req.body.slug === '') {
        req.flash('errors', 'Os campos estão vazios')
        res.redirect('/admin')
        return
    }

    const novaCatergoria = {
        tema: req.body.tema,
        slug: req.body.slug
    }

    // create banco de dados
    const bd = new Categorias(novaCatergoria);
    await bd.register()
        .then((data) => {
            req.flash('success', 'Categoria criada com sucesso')
            res.redirect('/admin/categorias')
        }).catch((e) => {
            console.log(e);
        })


}
exports.filter = async (req, res) => {
    const dados = await Categorias.prototype.buscarDados()
        .then((dados) => {
            res.render('listaDeCategorias', {
                dados: dados
            })
        }).catch((e) => {
            req.flash('Houve um erro ao listar os dados')
            res.redirect('/admin')
        })
}

exports.editar = async (req, res) => {
    const busca = await Categorias.prototype.buscaDadosPeloId(req.params.id)
        .then((dados) => {
            res.render('categoriasForm', {
                dados: dados
            })
        })
        .catch((e) => {
            console.log(e);
        })

}
exports.editarPost = async (req, res) => {
    Categorias.prototype.editarDados(req.body.id, req.body)
        .then((dados) => {
            req.flash('success', 'Alteração realizada com sucesso!')
            res.redirect(`/admin/categorias`)
        }).catch((e) => {
            req.flash('errors', 'Houve alguem erro ao tentar atualizar os dados!')
            console.log(e)
        })
}

exports.excluir = async (req, res) => {
    Categorias.prototype.delete(req.params.id)
    .then((dados) => {
        req.flash('success', 'Item excluído com sucesso!')
        res.redirect('/admin/categorias')
    }).catch((e) => {
        console.log(e);
    })
}