var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/:id', function(req, res, next) {
    if (!req.cookies.token) aux.gerarTokenConsumidor(req.originalUrl, res)
    else {
        axios.get('http://localhost:10000/api/users/' + req.params.id + '?token=' + req.cookies.token) // Ver se a info está a ser enviada como deve ser.
            .then(user => {
                res.render('perfil', {nivel: true,
                                    dono: true,
                                    user: user.data,
                                    publicacoes: [],
                                    noticias: []}) //TODO: Alterar este "dono". Nao pode ir a true.
                // TODO: Passar mais coisas: faltam as pubs. E o nivel do gajo.
            })
            .catch(error =>{
                res.render('error', {error : error})
            })
    }
})


module.exports = router;