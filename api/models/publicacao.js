const mongoose = require('mongoose')



var pubSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    descricao: {type: String, required: true},
    id_autor: {type: String, required: true},
    autor: {type: String, required: true},
    id_recurso: {type: String, required: true},
    dataCriacao: {type: String, required: true, default: new Date().toISOString().substr(0,19)},
    vis_recurso: {type: Boolean, required: true, default: true},
    comments: {type:[{
        user_id : {type: String, required: true},
        username: {type: String, required: true},
        comment: {type: String, required: true},
        commentDate: {type: String, required: true, default: new Date().toISOString().substr(0,19)}
    }], default:[]}
})

module.exports = mongoose.model('pub', pubSchema, 'pubs')