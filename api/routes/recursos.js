var express = require('express');
var router = express.Router();
const Recurso = require('../controllers/recurso')



router.get('/', function(req, res, next) {
    if(req.query.tipo)
        File.getByType(req.query.tipo)
        .then(dados => res.status(200).jsonp(dados))
        .catch(e => res.status(502).jsonp({error: e}))

    else if(req.query.q)
        File.titleContains(req.query.q)
        .then(dados => res.status(200).jsonp(dados))
        .catch(e => res.status(503).jsonp({error: e}))

    else
        File.list()
        .then(dados => res.status(200).jsonp(dados))
        .catch(e => res.status(504).jsonp({error: e}))
  });

router.get('/:rid', function(req, res, next) {
    File.get(req.params.rid)
    .then(dados => res.status(200).jsonp(dados[0]))
    .catch(e => res.status(505).jsonp({error: e}))
});

router.put('/:rid', function(req, res, next) {
    File.edit(req.params.rid, req.body)
        .then(function() {
            res.status(200).jsonp(req.params.rid)
        })
        .catch(function(err) {
            console.log(err.message)
            res.status(506).jsonp({ error:err.message })
        })
})


module.exports = router;