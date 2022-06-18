var express = require('express');
var router = express.Router();
var axios = require('axios');
var moment = require('moment')

var aux = require('./auxiliars')


router.get('/:id', function(req,res) {
    if (!req.cookies.token) aux.consumerTokenGenerator(req.originalUrl, res)
    else {
        var token = aux.unveilToken(req.cookies.token)

        axios.get('http://localhost:10000/api/publicacoes/' + req.params.id + '?token=' + req.cookies.token)
            .then(dados => {
                var visitante
                if (token.nivel == 'consumidor') {
                    res.render('publicacao', {publicacao: dados.data, nivel: token.nivel})
                }
                else {
                    axios.get('http://localhost:10000/api/users/' + token._id + '?token=' + req.cookies.token)
                        .then(visitanteData => {
                            visitante = visitanteData.data
                            res.render('publicacao', {publicacao: dados.data, nivel: token.nivel, visitante})
                        })  
                        .catch(error => res.render('error', {error}))
                }
            })
            .catch(error => res.render('error', {error}))
    }
})


router.post('/comentar/:id', function(req, res) {
    if (!req.cookies.token) aux.consumerTokenGenerator(req.originalUrl, res)
    else {
        var token = aux.unveilToken(req.cookies.token)

        if (token.nivel == 'produtor' || token.nivel == 'admin') {
            req.body["idUser"] = token._id
            req.body["username"] = token.username
            req.body["commentDate"] = new Date().toISOString().substr(0,19)
            console.log("COMENTÁRIO ADICIONADO!!!")
            //console.log(req.body)

            var dataAtual = new Date().toISOString().substr(0, 19);
            axios.post('http://localhost:10000/api/publicacoes/comentar/' + req.params.id + '?token=' + req.cookies.token, req.body)
                        .then(pubComentada => {
                            console.log("PUBCOMENTADA: !!!")
                            //console.log(pubComentada.data)
                            var idRecurso = pubComentada.data.idRecurso
                            
                            axios.get('http://localhost:10000/api/recursos/'+ idRecurso + '?token=' + req.cookies.token)
                                .then(recurso => {
                                    var rec = recurso.data

                                    var noticiaObj = {
                                        idAutor: token._id,
                                        nomeAutor: token.username,
                                        recurso: {
                                            id: rec._id,
                                            titulo: rec.titulo,
                                            tipo: rec.tipo,
                                            estado: 'Comentado'
                                        },
                                        data: dataAtual
                                    }

                                    axios.post('http://localhost:10000/api/noticias?token=' + req.cookies.token, {noticia: noticiaObj})
                                    .then(dados => res.redirect("/publicacoes/"+pubComentada.data._id))
                                    .catch(error => res.render('error', {error}))
                                })
                                .catch(error => res.render('error', {error}))
                        })
                        .catch(error => res.render('error', {error}))
        }
    }
})




module.exports = router;
