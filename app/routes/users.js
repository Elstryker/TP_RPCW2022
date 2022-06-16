var express = require('express');
var router = express.Router();
var axios = require('axios');
var moment = require('moment')


// TODO: Testar esta merda direita. (vai dar cagada for sure)
router.post('/registo', function(req, res) {
    console.log(req.body);
    axios.post('http://localhost:30000/users/registo', req.body)
       .then(res.redirect('/'))
       .catch(error => res.render('error', {error}))
  }
)

router.post('/login', function(req, res) {
  axios.post('http://localhost:30000/users/login', req.body)
     .then(res.redirect('/'))
     .catch(error => res.render('error', {error}))
}
)

router.get('/', function(req, res, next) {
  
  axios.get('http://localhost:10000/api/users?token=' + req.cookies.token) // Ver se a info está a ser enviada como deve ser.
      .then(users => {
          users.data.forEach(u => {
            delete u.password;
            u.dataRegisto = moment(u.dataRegisto).format('DD-MM-YYYY')
          });
          res.render('users', {users: users.data})
      })
      .catch(error => res.render('error', {error : error}))
  
})

module.exports = router;
