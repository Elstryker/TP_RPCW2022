var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// TODO: Testar esta merda direita. (vai dar cagada for sure)
router.post('/registo', function(req, res) {
    axios.post('http://localhost:30000/users/registo', req.body)
      .then(dados => {
        if (dados.data.token) {
          res.cookie('token', dados.data.token, {
            expires: new Date(Date.now() + '1d'),
            secure: false,
            httpOnly: true
          })

          if (req.headers.referer == 'http://localhost:20000/users/signup') res.redirect('/')
          else res.redirect(req.headers.referer)
        }
        else {
          aux.renderHome(req.cookies.token, res, {
            invalidSField: dados.data.invalidInput,
            ...req.body,
            error_msg: dados.data.error
          })
        }
      })
      .catch(error => res.render('error', {error}))
  }
)

module.exports = router;
