var Publicacao = require('../models/publicacao')


module.exports.listar = () => {
    return Publicacao
        .find()
        .sort('-dataCriacao')
        .exec()
}

module.exports.consultar = id => {
    return Publicacao
        .findOne({_id: id})
        .exec()
}

module.exports.addComentario = (id, com) => {
    return Publicacao
        .findOneAndUpdate(
            {_id : id},
            {$push: {comments: com}},
            {useFindAndModify: false, new: true}
        )
}

module.exports.atualizarEstado = (idRecurso, estado) => {
    return Publicacao.updateMany(
        {"idRecurso": idRecurso},
        [{ $set: {
            'visRecurso': estado
        }}],
        {multi: true})
}

module.exports.alterar = function(u) {
    return User.findByIdAndUpdate({_id: u._id}, u, {new: true})
}



module.exports.pubsUtilizador = (id) => {
    return Publicacao
        .find({idAutor: id})
        .sort('-dataCriacao')
        .exec()
}

module.exports.inserir = p => {
    var novo = new Publicacao(p)
    return novo.save()
}

module.exports.remover = function (id) {
    return Publicacao.deleteOne({ _id: id });
  };
  