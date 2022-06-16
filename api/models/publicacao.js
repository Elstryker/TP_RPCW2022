const mongoose = require('mongoose')

var publicacaoSchema = new mongoose.Schema({
    author: {type: String, required: true},
    id_file: {type: String, required: true},
    comments: [{
        user_id : String,
        username: String,
        comment: String,
        commentDate: Date
    }],
    ratings: [{
        user: String,
        rating: Number
    }]
})

module.exports = mongoose.model('user', userSchema, 'users')