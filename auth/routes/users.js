var express = require('express');
var router = express.Router();
const User = require('../controllers/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/registo', function(req, res, next) {
  console.log(req.body)
  User.inserir(req.body).then(dados => res.status(200).jsonp(dados))
  .catch(e => {
    res.status(500).jsonp({error: e})
    console.log(e)
  });
});


module.exports = router;
