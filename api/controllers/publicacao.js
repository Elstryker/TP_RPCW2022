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
        {"id_recurso": idRecurso},
        [{ $set: {
            'vis_recurso': estado
        }}],
        {multi: true})
}

module.exports.pubsUtilizador = (id) => {
    return Publicacao
        .find({id_autor: id})
        .sort('-dataCriacao')
        .exec()
}

module.exports.inserir = p => {
    var novo = new Publicacao(p)
    return novo.save()
}