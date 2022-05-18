var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var AdmZip  = require('adm-zip')

const aux = require('./aux')

var upload = multer({dest: 'uploads/'})

router.get('/', function(req, res) {
    res.render('create', {})
})

router.get('/file', function(req, res) {
    res.render('form', {})
})

router.post('/file', upload.single('file'), async function(req, res) {
    console.log(req.body)
    let oldPath = __dirname + '/../' + req.file.path
    let newPath = __dirname + '/../uploads/' + req.file.originalname + '.zip'

    fs.rename(oldPath, newPath, function(err) {
        if(err)
            throw err;
    })

    console.log("File received")

    try {
        aux.loadZipAndProcessIt(newPath,req.body)
    } catch (error) {
        console.log(error)
    }

    console.log("Loaded Zip")


    res.status(200).redirect('/')
})

router.get('/xml', function(req, res) {
    res.render('formXML', {})
})

module.exports = router;