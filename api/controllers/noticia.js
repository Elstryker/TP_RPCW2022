var Noticia = require('../models/noticia')

module.exports.listar = () => {
    return Noticia
        .find()
        .sort('-data')
        .exec()
}

module.exports.atualizarEstado = (idRecurso,estado,disponivel) => {
    if (!disponivel) {
        return Noticia.updateMany(
            {"recurso.id": idRecurso, "recurso.estado": { $regex: /^((Novo)|(Atualizado))/ }},
            [{ $set: {
                'recurso.estado': { $concat: [estado+'-', '$recurso.estado'] }
            }}],
            {multi: true})
    }
    else {
        return Noticia.updateMany(
            {"recurso.id": idRecurso, "recurso.estado": { $regex: /^Privado/ }},
            [{ $set: {
                'recurso.estado': {$arrayElemAt:[{$split: ["$recurso.estado" , "-"]}, 1]}
            }}],
            {multi: true})
    }
}

module.exports.noticiasUtilizador = id =>{
    return Noticia
        .find({"idAuto": id})
        .sort('-data')
        .exec()
}

module.exports.inserir = noticia => {
    var nova = new Noticia(noticia)
    return nova.save()
}