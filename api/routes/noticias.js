var express = require('express');
var router = express.Router();
const Noticia = require('../controllers/noticia')


router.get('/', function(req, res) {
    Noticia.listar()
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(501).jsonp({error: e}))
  })

  router.get('/index', function(req, res) {
    Noticia.listarIndex()
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(501).jsonp({error: e}))
  })
  
router.get('/autor/:id',function(req,res){
Noticia.noticiasUtilizador(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(502).jsonp({error: e}))
})

// Inserir noticia
router.post('/', function(req, res){
    Noticia.inserir(req.body.noticia)
        .then(dados => {
          dados => res.status(201).jsonp({dados})
        .catch(e => res.status(504).jsonp({error: e}))
})

// Atualizar estado para indisponível
router.post('/atualizarEstado/:id', function(req, res){
    Noticia.atualizarEstado(req.params.id, req.body.estado, false)
      .then(dados => res.status(201).jsonp({dados}))
      .catch(e => res.status(505).jsonp({error: e}))
  })


module.exports = router;