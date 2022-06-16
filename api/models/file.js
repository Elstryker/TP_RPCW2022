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
})

module.exports = mongoose.model('file', fileSchema, 'files')