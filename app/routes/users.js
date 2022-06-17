var express = require('express');
var router = express.Router();
var axios = require('axios');
var moment = require('moment')

var aux = require('./auxiliars')


// TODO: Testar esta merda direita. (vai dar cagada for sure)
router.post('/registo', function(req, res) {
    console.log(req.body);
    axios.post('http://localhost:30000/users/registo', req.body)
        .then(dados => {
            
            if(dados.data.token){
                res.cookie('token', dados.data.token, {
                    expires: new Date(Date.now() + '1d'),
                    secure: false,
                    httpOnly: true
                })
                res.redirect('/')
            }
            else {
                aux.renderIndex(req.cookies.token, res, {
                                    invalidSField: dados.data.invalidInput, 
                                    ...req.body,
                                    error_msg: dados.data.error})
            }
        })
        .catch(error => res.render('error', {error}))
})

router.post('/login', function(req, res) {
    axios.post('http://localhost:30000/users/login', req.body)
        .then(dados => {
            console.log(dados.data);
            if(dados.data.token){
                res.cookie('token', dados.data.token, {
                    expires: new Date(Date.now() + '1d'),
                    secure: false,
                    httpOnly: true
                })
                res.redirect('/')
            }
            else {
                aux.renderIndex(req.cookies.token, res, {
                    invalidLField: dados.data.invalidInput, 
                    ...req.body,
                    error_msg: dados.data.error})
            }
        })
        .catch(error => res.render('error', {error}))
})


router.get('/logout', function(req, res) {
    res.clearCookie("token");
    res.redirect('/');
})

router.get('/', function(req, res, next) {
    if(!req.cookies.token) aux.consumerTokenGenerator(req.originalUrl, res)
    else {
        var token = aux.unveilToken(req.cookies.token)
        axios.get('http://localhost:10000/api/users?token=' + req.cookies.token)
        .then(users => {
            users.data.forEach(u => {
                delete u.password;
                u.dataRegisto = moment(u.dataRegisto).format('DD-MM-YYYY')
            });
            res.render('users', {nivel: token.nivel, users: users.data})
        })
        .catch(error => res.render('error', {error : error}))
    }
})

module.exports = router;
