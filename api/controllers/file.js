const File = require('../models/file')

module.exports.list = () => {
    return File.find().sort({submissionDate:1}).exec()
}

module.exports.get = (id) => {
    return File.find({_id:id}).exec()
}

module.exports.getByType = (type) => {
    return File.find({fileType:type}).sort({submissionDate:1}).exec()
}

module.exports.titleContains = (pal) => {
    return File.find({title:{$regex:`.*${pal}.*`}}).sort({submissionDate:1}).exec()
}

module.exports.createFile = (file) => {
    var newFile = new File(file)
    return newFile.save()
}

module.exports.edit = async function (id, data) {
    var p = await File.findById(id).exec();
    Object.keys(data).forEach(key => {
        if (p[key] != undefined)
            p[key]=data[key]
        })
    return p.save();
  };