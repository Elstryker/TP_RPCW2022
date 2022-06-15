var express = require('express');
var router = express.Router();
var axios = require('axios');


router.get('/', function(req, res, next){
    //TODO: Precisamos do token, ver o id!
    
    var token = "..."


    if (token._id) res.redirect('/perfil/' + token._id)
    else res.redirect('/')
})

router.get('/:id', function(req, res, next) {
    var token = "..."
    axios.get('http://localhost:10000/api/users/' + req.params.id + '?token=' + req.cookies.token) // Ver se a info está a ser enviada como deve ser.
        .then(user => {

            //var dono = req.params.id == token._id || token.nivel == 'admin'
            dono = true;
            res.render('perfil', {nivel: "token.nivel",
                                dono: dono,
                                user: user.data,
                                publicacoes: [],
                                noticias: []}) //TODO: Alterar este "dono". Nao pode ir a true.
            // TODO: Passar mais coisas: faltam as pubs. E o nivel do gajo.
        })
        .catch(error =>{
            res.render('error', {error : error})
        })
})

router.post('/:id/editar', function(req, res, next){
    // if (!req.cookies.token) aux.gerarTokenConsumidor(req.originalUrl, res)
    // else {

    // }

    var token = "..." // Testar se é admin ou produtor?? 

    // if ((token.nivel == 'produtor' || token.nivel == 'admin') && token._id == req.params.id) {

    // }

    var updated = {_id : req.params.id,
                username: req.body.username, 
                estatuto: req.body.estatuto, 
                filiacao: req.body.filiacao,
                descricao: req.body.descricao}

    console.log(req.params);

    axios.put('http://localhost:10000/api/users/' + req.params.id + '?token='+req.cookies.token, updated)
        .then(dados => res.redirect("/perfil/"+req.params.id))
        .catch(error => res.render('error', {error: error}))


})


module.exports = router;