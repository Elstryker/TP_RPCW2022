const mongoose = require('mongoose')

var fileSchema = new mongoose.Schema({
    creationDate: String,
    submissionDate: String,
    author: String,
    submitter: String,
    title: String,
    mimetype: String,
    size: Number,
    path: String,
    fileType: String,
    comments: [{
        user : String,
        comment: String,
        commentDate: Date
    }],
    ratings: [{
        user: String,
        rating: Number
    }]
})

module.exports = mongoose.model('file', fileSchema, 'files')