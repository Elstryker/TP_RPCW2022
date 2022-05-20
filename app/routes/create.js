var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var AdmZip  = require('adm-zip')
var mime = require('mime-types')
var axios = require('axios');

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

    fs.renameSync(oldPath, newPath, function(err) {
        if(err)
            throw err;
    })

    console.log(newPath)

    console.log("File received")

    try {
        var files = aux.loadZipAndProcessIt(newPath,req.body)
    } catch (error) {
        console.log(error)
    }

    var authors = req.body.authors.split(',')
    var titles = req.body.titles.split(',')
    var creationDates = req.body.creationDates.split(',')

    files.then(function (files) {
        console.log(files)
        for(var i = 0; i < files.length; i++) {
            var file = files[i]
            var fileObj = {
                creationDate: creationDates[i],
                submissionDate: new Date().toISOString().substring(0,16),
                author: authors[i],
                submitter: 'admin',
                title: titles[i],
                mimetype: mime.lookup(file),
                size: fs.lstatSync(file).size,
                path: file
            }

            console.log(fileObj)

            axios.post('http://localhost:10000/api/file',fileObj, (error) => {
                if(error) {
                    res.status(500).render('error', {error: error})
                    throw error
                }
            })            
            
            res.status(200).redirect('/')
        }

    })
    .catch(err => {
        console.log(err)
        res.status(500).render('error', { error: err })
    })

})

router.get('/xml', function(req, res) {
    res.render('formXML', {})
})

module.exports = router;