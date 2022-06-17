var express = require('express');
var router = express.Router();
var axios = require('axios');
var moment = require('moment')
var multer = require('multer');
var fs = require('fs');
var mime = require('mime-types')

const pathLib = require('path')

var aux = require('./auxiliars')
const auxFiles = require('./funcs')
var bagit = require('../public/javascripts/bagit');
const { token } = require('morgan');

var upload = multer({dest: 'uploads/'})


router.get('/', function(req, res) {
    if (!req.cookies.token) aux.gerarTokenConsumidor(req.originalUrl, res)
    else {
    axios.get('http://localhost:10000/api/recursos?token=' + req.cookies.token)
        .then(dados => {
            axios.get('http://localhost:10000/api/recursos/tipos?token=' + req.cookies.token)
                .then(tipos_bd => {
                    var varsPug = aux.variaveisRecursos(dados.data, tipos_bd, req.cookies.token, false)
                    res.render('recursos', varsPug)
                })
                .catch(error => res.render('error', {error}))
        })
        .catch(error => res.render('error', {error}))
    }
})

router.post('/file', upload.single('file'), async function(req, res) {
    if(!req.cookies.token) auxFiles.gerarTokenConsumidor(req.originalUrl, res)
    else {
        console.log(req.body)
        var token = aux.unveilToken(req.cookies.token)
        let oldPath = pathLib.join(__dirname,'/../',req.file.path)
        let newPath = pathLib.join(__dirname, '/../uploads/', req.file.originalname+'.zip')

        fs.renameSync(oldPath, newPath, function(err) {
            if(err)
                throw err;
        })

        console.log(oldPath)
        console.log(newPath)

        console.log("File received")

        try {
            var files = auxFiles.loadZipAndProcessIt(newPath,req.body)
        } catch (error) {
            console.log(error)
        }

        var authors = req.body.authors.split(',')
        var titles = req.body.titles.split(',')
        var creationDates = req.body.creationDates.split(',')
        
        var autorRecurso = req.body.autorRecurso
        var tituloRecurso = req.body.tituloRecurso
        var descRecurso = req.body.descRecurso
        var tipoRecurso = req.body.tipoRecurso
        var dataRecurso = req.body.dataCriacao

        var visibilidadeRecurso = true; //TODO: alterar

        var filesList = []

        files.then(function (files) {
            console.log(files)

            for(var i = 0; i < files.length; i++) {
                var file = files[i]
                var fileActualPath = pathLib.normalize(__dirname.replace('/routes','/public/files' + file))
                var fileObj = {
                    creationDate: creationDates[i],
                    submissionDate: new Date().toISOString().substring(0,16),
                    author: authors[i],
                    submitter: token.nivel,
                    title: titles[i],
                    mimetype: mime.lookup(fileActualPath),
                    size: fs.lstatSync(fileActualPath).size,
                    path: file,
                }
                console.log(fileObj);
                filesList.push(fileObj)
            }
            var dataAtual = new Date().toISOString().substr(0,19)
                
            var recursoObj = {
                idAutor: token._id,
                nomeAutor: autorRecurso,
                titulo: tituloRecurso,
                tipo: tipoRecurso,
                descricao: descRecurso,
                dataCriacao: dataRecurso,
                dataRegisto: dataAtual,
                dataUltimaMod: dataAtual,
                visibilidade: visibilidadeRecurso,
                ficheiros: filesList
            }

            axios.post('http://localhost:10000/api/recursos?token=' + req.cookies.token, {recurso: recursoObj})
                .then(dados => {
                    var novoRecurso = dados.data
                    console.log(novoRecurso);

                    if(novoRecurso.visibilidade){
                        
                        var noticiaObj = {
                            idAutor: token._id,
                            nomeAutor: token.nome,
                            recurso: {
                                id: novoRecurso._id,
                                titulo: novoRecurso.titulo,
                                tipo: novoRecurso.tipo,
                                estado: 'Novo'
                            },
                            data: dataAtual
                        }

                        axios.post('http://localhost:10000/api/noticias?token' + req.cookies.token, {noticiaObj})
                            .then(dados => res.redirect('/perfil'))
                            .catch(error => res.render('error', {error}))
                    }

                })
                .catch(error => res.render('error', {error}))

        })
        .catch(err => {
            console.log(err)
            res.status(500).render('error', { error: err })
        })



    }
})

// A testar
router.post('/download', (req,res) => {
    if (!req.cookies.token) aux.gerarTokenConsumidor(req.originalUrl, res)
    else {   
    axios.get('http://localhost:10000/recursos/:id' + req.params.id + 'token=' + req.cookies.token)
        .then(recursoData => {

            let titulo = recursoData.data.titulo
            let ficheiros = recursoData.data.ficheiros
            var zip = bagit.compressFiles(ficheiros)
            

        axios.post('http://localhost:10000/recursos/download?token=' + req.cookies.token, req.params.id)
            .then(() => {
            res.writeHead(200, {
                "Content-Type": "application/zip",
                "Content-Disposition": `attachment; filename=${titulo}.zip`,
            })
            res.write(zip)
            res.end()
            })
            .catch(errors => res.render('error', {error:errors[0]}))
        })
        .catch(error => res.render('error', {error}))
    }
})










module.exports = router;