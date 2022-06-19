var express = require("express");
var router = express.Router();
const Recurso = require("../controllers/recurso");
const TipoRecurso = require("../controllers/tipoRecurso");

router.get("/", function (req, res, next) {
    if (req.query.tipo) {
        Recurso.pesquisarPorTipo(req.query.tipo, req.body.meus_recursos)
            .then((dados) => res.status(201).jsonp(dados))
            .catch((e) => res.status(508).jsonp({ error: e }));
    } else if (req.query.a) {
        Recurso.pesquisarPorTitulo(req.query.a, req.body.meus_recursos)
            .then((dados) => res.status(201).jsonp(dados))
            .catch((e) => res.status(509).jsonp({ error: e }));
    }
    Recurso.listar()
        .then((dados) => res.status(200).jsonp(dados))
        .catch((e) => {
            console.log(e);
            res.status(501).jsonp({ error: e });
        });
});

router.get("/:rid", function (req, res) {
    Recurso.consultar(req.params.rid)
        .then((dados) => res.status(200).jsonp(dados))
        .catch((e) => {
            console.log(e);
            res.status(504).jsonp({ error: e });
        });
});

router.put('/:id/classificar/', function (req, res) {
    Recurso.atualizarClassificacao(req.params.id, req.body)
        .then(dados => {
            if (!dados) {
                Recurso.classificar(req.params.id, req.body)
                    .then(dados => res.status(201).jsonp({ dados }))
                    .catch(e => res.status(500).jsonp({ error: e }))
            }
            else res.status(201).jsonp({ dados })
        })
        .catch(e => res.status(500).jsonp({ error: e }))
});

// Inserir recursos
router.post("/", function (req, res) {
    Recurso.inserir(req.body.recurso)
        .then((dados) => res.status(201).jsonp({ dados }))
        .catch((e) => res.status(506).jsonp({ error: e }));
});

// Alterar um recurso
router.put("/", function (req, res) {
    Recurso.alterar(req.body)
        .then((dados) => res.status(201).jsonp({ dados }))
        .catch((e) => res.status(507).jsonp({ error: e }));
});

//Incrementar numero de Downloads de um recurso
router.post("/inc/:id", function (req, res) {
    Recurso.incrementarDownloads(req.params.id)
        .then((dados) => res.status(201).jsonp({ dados }))
        .catch((e) => res.status(508).jsonp({ error: e }));
});


router.post('editar/:id', function (req, res) {
    Recurso.editar(req.params.id,req.body)
        .then(dados => res.status(201).jsonp({ dados }))
        .catch((e) => res.status(511).jsonp({ error: e }))
})

router.get('/autor/:id', function (req, res) {
    Recurso.pesquisarMeusRecursos(req.params.id)
        .then((dados) => res.status(200).jsonp({ dados }))
        .catch((e) => {
            console.log(e)
            res.status(510).jsonp({ error: e })
        })
})

router.delete('/:id', function (req, res) {
    Recurso.remover(req.params.id)
        .then(dados => res.status(200).jsonp(dados))
        .catch(e => res.status(512).jsonp({ error: e }))
});

module.exports = router;
