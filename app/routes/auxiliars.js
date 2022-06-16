var jwt = require('jsonwebtoken')
var keyToken = "TP_RPCW2022"
var crypto = require("crypto")
var fs = require('fs')
var mime = require('mime-types')
var moment = require('moment')
var axios = require('axios')

function consumerTokenGenerator(url, res) {
  axios.get('http://localhost:30000/users/consumidor')
    .then(dados => {
        res.cookie('token', dados.data.token, {
          expires: new Date(Date.now() + '1h'),
          secure: false,
          httpOnly: true
        })

        res.redirect(url)
    })
    .catch(error => res.render('error', {error}))
}

function unveilToken(token){  
    var t = null;
    
    jwt.verify(token,keyToken,function(e,decoded){
      if(e){
        console.log('Erro: ' + e)
        t = null
      }
      else return t = decoded
    })

    return t
}


function renderIndex(cookiesToken, res, atribs) {
    // Ir buscar publicações, notícias, etc...

    var token = unveilToken(cookiesToken)
    var publicacoes = {}
    var noticias = {}

    res.render('index', {nivel: token.nivel, pubs: publicacoes, noticias: noticias, ...atribs})
}

module.exports = {
  consumerTokenGenerator,
  unveilToken,
  renderIndex
}