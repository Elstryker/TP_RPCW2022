var express = require('express');
var router = express.Router();
const File = require('../controllers/file')

/* GET home page. */
router.get('/', function(req, res, next) {
    File.list()
        .then(function (data) {
            res.status(200).jsonp(data);
        })
        .catch(function (err) {
            res.status(500).jsonp(err);
        })
});

router.post('/file', function(req, res, next) {
    // File.createFile(req.body)
    //     .then(() => res.status(200).end())
    //     .catch((err) => {res.status(500).end()})
    console.log("Ficheiro recebido")
    console.log(req.body)
    res.status(200).end()
})

module.exports = router;
