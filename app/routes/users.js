var express = require('express');
var router = express.Router();
var axios = require('axios');
var moment = require('moment')


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

router.get('/', function(req, res, next) {
  
  axios.get('http://localhost:10000/api/users?token=' + req.cookies.token) // Ver se a info está a ser enviada como deve ser.
      .then(users => {
          users.data.forEach(u => {
            u.password = "";
            u.dataRegisto = moment(u.dataRegisto).format('DD-MM-YYYY')
          });
          res.render('users', {users: users.data})
      })
      .catch(error => res.render('error', {error : error}))
  
})

module.exports = router;
