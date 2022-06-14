var express = require('express');
var router = express.Router();
const File = require('../controllers/file')

/* GET home page. */
router.get('/', function(req, res, next) {
    File.list()
        .then(function (data) {
            res.status(200).jsonp(data);
        })
        .catch(function (err) {
            res.status(500).jsonp(err);
        })
});

router.post('/file', function(req, res, next) {
    File.createFile(req.body)
        .then(() => {
            console.log("Ficheiro recebido")
            console.log(req.body)
            res.status(200).end()
        })
        .catch((err) => {res.status(500).end(err)})
})

//--ENDPOINT RECURSOS--//

router.get('/recursos', function(req, res, next) {
    if(req.query.tipo)
        File.getByType(req.query.tipo)
        .then(dados => res.status(200).jsonp(dados))
        .catch(e => res.status(500).jsonp({error: e}))

    else if(req.query.q)
        File.titleContains(req.query.q)
        .then(dados => res.status(200).jsonp(dados))
        .catch(e => res.status(500).jsonp({error: e}))

    else
        File.list()
        .then(dados => res.status(200).jsonp(dados))
        .catch(e => res.status(500).jsonp({error: e}))
  });

router.get('/recursos/:rid', function(req, res, next) {
    File.get(req.params.rid)
    .then(dados => res.status(200).jsonp(dados[0]))
    .catch(e => res.status(500).jsonp({error: e}))
});

router.put('/recursos/:rid', function(req, res, next) {
    File.edit(req.params.rid, req.body)
        .then(function() {
            res.status(203).jsonp(req.params.rid)
        })
        .catch(function(err) {
            console.log(err.message)
            res.status(503).jsonp({ error:err.message })
        })
})


module.exports = router;
