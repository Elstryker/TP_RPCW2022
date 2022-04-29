const File = require('../models/file')

module.exports.list = () => {
    return Ficheiro.find().exec()
}

module.exports.createFile = (file) => {
    var newFile = new File(file)
    newFile.save()
}