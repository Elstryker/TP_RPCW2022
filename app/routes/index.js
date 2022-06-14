var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {});
});

router.get('/utilizadores', function(req, res, next) {
    if (!req.cookies.token) aux.gerarTokenConsumidor(req.originalUrl, res)
    else {
        axios.get('http://localhost:10000/users?token=' + req.cookies.token) // Ver se a info está a ser enviada como deve ser.
            .then(users => {
                res.render('users', {nivel: token.nivel, users:users.data})
            })
            .catch(error => res.render('error', {error : error}))
    }
})

module.exports = router;
