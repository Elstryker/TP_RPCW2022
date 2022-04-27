var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('create', {})
})

router.get('/file', function(req, res) {
    res.render('form', {})
})

router.get('/xml', function(req, res) {
    res.render('formXML', {})
})

module.exports = router;