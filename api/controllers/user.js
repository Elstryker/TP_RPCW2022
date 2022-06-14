var User = require('../models/user')


module.exports.listar = () => {
    return User
        .find()
        .sort('username')
        .exec()
}

// module.exports.consultar = email => {
//     return User
//         .findOne({email})
//         .exec()
// }

module.exports.consultar = id => {
    return User
        .findOne({_id : id})
        .exec()
}

module.exports.inserir = u => {
    var novo = new User(u)
    return novo.save()
}

module.exports.remover = function(email) {
    return User.deleteOne({email})
}

module.exports.alterar = function(u) {
    return User.findByIdAndUpdate({email: u.email}, u, {new: true})
}