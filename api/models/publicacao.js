const mongoose = require('mongoose')

var publicacaoSchema = new mongoose.Schema({
    author: {type: String, required: true},
    id_file: {type: String, required: true},
    comments: {type:[{
        user_id : {type: String, required: true},
        username: {type: String, required: true},
        comment: {type: String, required: true},
        commentDate: {type: Date, required: true}
    }], default:[]},
    ratings: {type: [{
        user: {type: String, required: true},
        rating: {type: Number, required: true}
    }], default: []}
})

module.exports = mongoose.model('user', userSchema, 'users')