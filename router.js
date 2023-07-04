const express = require('express');
const router = express.Router();
const controllerHome = require('./src/controllers/ControllerHome');
const controllerAdmin = require('./src/controllers/ControllerAdmin');
const controllerPostagens = require('./src/controllers/ControllerPostagens');
const controllerUsers = require('./src/controllers/ControllerUsers');
const {eAdmin} = require('./helpers/eAdmin')

// ========================================= rotas principais
router.get('/', controllerHome.index);
router.get('/postagem/:slug', controllerHome.postagem)
router.get('/categorias', controllerHome.categorias)
router.get('/categorias/:slug',eAdmin, controllerHome.AllPostagensDaCategoria);
// 

//  ========================================  Rotas admin
router.get('/admin',eAdmin, controllerAdmin.index);
router.post('/admin',eAdmin, controllerAdmin.post);

router.get('/admin/categorias',eAdmin, controllerAdmin.filter);

router.get('/admin/categorias/editar/:id',eAdmin, controllerAdmin.editar );
router.post('/admin/categorias/editar/:id',eAdmin, controllerAdmin.editarPost);

router.get('/admin/categorias/excluir/:id',eAdmin, controllerAdmin.excluir);

// Rotas admin de postagems
router.get('/admin/postagens',eAdmin, controllerPostagens.index);
router.get('/admin/postagens/add',eAdmin, controllerPostagens.form);

router.post('/admin/postagens/nova',eAdmin, controllerPostagens.postagemNova);

router.get('/admin/postagens/editar/:id',eAdmin, controllerPostagens.editar);
router.post('/admin/postagens/editar/:id',eAdmin, controllerPostagens.update);

router.get('/admin/postagens/delete/:id',eAdmin, controllerPostagens.delete);
// 


// ================================ Rotas de users de autentication
router.get('/usuario/registro', controllerUsers.index);
router.post('/usuario/registro', controllerUsers.registroPost);

router.get('/usuario/login', controllerUsers.login);
router.post('/usuario/login', controllerUsers.loginPost);
router.get('/usuario/logout', controllerUsers.logout);






module.exports = router;