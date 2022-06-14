const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    estatuto: String,
    filiacao: String,
    password: String

})

module.exports = mongoose.model('user', userSchema, 'users')