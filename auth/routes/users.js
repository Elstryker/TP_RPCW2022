var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var passport = require('passport')

var User = require('../controllers/user')

// Listar os Utilizadores
router.get('/', function (req, res) {
  User.listar()
    .then(dados => res.status(200).jsonp({ dados: dados }))
    .catch(e => res.status(500).jsonp({ error: e }))
})

/* TO BE CONTINUED...

router.get('/consumidor', function(req, res) {
  jwt.sign({
    nivel: 'consumidor',
    sub: 'TP_DAW2020'}, 
    "TP_DAW2020",
    {expiresIn: "1h"},
    function(e, token) {
      if(e) res.status(500).jsonp({error: "Erro na geração do token de consumidor: " + e}) 
      else res.status(201).jsonp({token})
  })
})




*/

// inserir novo utilizador
router.post('/', function (req, res) {
  User.inserir(req.body)
    .then(dados => res.status(201).jsonp({ dados }))
    .catch(error => res.status(500).jsonp({ error }))
})

// login de utilizador
router.post('/login', passport.authenticate('login-authentication'), function (req, res) {
  jwt.sign({
    _id: req.user.user._id,
    nome: req.user.user.nome,
    nivel: req.user.user.nivel,
    sub: 'TP_RPCW2022'
  },
    "TP_RPCW2022",
    { expiresIn: "1d" },
    function (e, token) {
      if (e) res.status(500).jsonp({ error: "Erro na geração do token: " + e })
      else res.status(201).jsonp({ token })
    })

})


module.exports = router;