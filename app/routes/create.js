var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');

var upload = multer({dest: 'uploads/'})

router.get('/', function(req, res) {
    res.render('create', {})
})

router.get('/file', function(req, res) {
    res.render('form', {})
})

router.post('/file', upload.single('file'), function(req, res) {
    console.log(req.body)
    console.log(req.files)
    let oldPath = __dirname + '/../' + req.file.path
    let newPath = __dirname + '/../public/files/' + req.file.originalname + '.zip'
    fs.rename(oldPath, newPath, function(err) {
        if(err)
            throw err;
    })
    res.status(200).redirect('/')
})

router.get('/xml', function(req, res) {
    res.render('formXML', {})
})

module.exports = router;