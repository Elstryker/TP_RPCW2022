var express = require('express');
var router = express.Router();
var axios = require('axios');

var aux = require('./auxiliars')


router.get('/', function(req, res, next){
    if(!req.cookies.token) aux.consumerTokenGenerator(req.originalUrl, res)
    else {
        var token = aux.unveilToken(req.cookies.token)
        if (token._id) res.redirect('/perfil/' + token._id)
        else res.redirect('/')
    }
})

router.get('/:id', function(req, res, next) {
    if (!req.cookies.token) aux.consumerTokenGenerator(req.originalUrl, res)
    else {
        var token = aux.unveilToken(req.cookies.token)
        axios.get('http://localhost:10000/api/users/' + req.params.id + '?token=' + req.cookies.token)
            .then(user => {

                var dono = req.params.id == token._id || token.nivel == 'admin'
                res.render('perfil', {nivel: token.nivel,
                                    dono: dono,
                                    user: user.data,
                                    publicacoes: [], //TODO: Meter publicações.
                                    noticias: []})
            })
            .catch(error =>{
                res.render('error', {error : error})
            })
        }
})

router.post('/:id/editar', function(req, res, next){
    if (!req.cookies.token) aux.consumerTokenGenerator(req.originalUrl, res)
    else {
        var token = aux.unveilToken(req.cookies.token)

        if ((token.nivel == 'produtor' || token.nivel == 'admin') && token._id == req.params.id) {

        var updated = {_id : req.params.id,
                    username: req.body.username, 
                    estatuto: req.body.estatuto, 
                    filiacao: req.body.filiacao,
                    descricao: req.body.descricao}

        console.log(req.params);

        axios.put('http://localhost:10000/api/users/' + req.params.id + '?token='+req.cookies.token, updated)
            .then(dados => res.redirect("/perfil/"+req.params.id))
            .catch(error => res.render('error', {error: error}))

        }
        else {
            res.redirect('/perfil/' + req.params.id)
        }
    }
})


module.exports = router;