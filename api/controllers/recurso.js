// Controlador para o modelo Recurso
var Recurso = require("../models/recurso");

// lista os recursos
module.exports.listar = () => {
  return Recurso.aggregate([
    {
      $project: {
        _id: 1,
        titulo: 1,
        tipo: 1,
        idAutor: 1,
        nomeAutor: 1,
        visibilidade: 1,
        ratings: { $ifNull: [{ $avg: "$ratings.rating" }, 0] },
        dataUltimaMod: 1,
        tamanho: 1,
        nrDownloads: 1,
      },
    },
  ]).sort("-dataUltimaMod");
};

module.exports.listarPorIDs = (ids) => {
  return Recurso.find().where("_id").in(ids).exec();
};

// pesquisar "meus" recursos
module.exports.pesquisarMeusRecursos = (idAutor) => {
  return Recurso.aggregate([
    { $match: { idAutor: idAutor } },
    {
      $project: {
        _id: 1,
        titulo: 1,
        tipo: 1,
        idAutor: 1,
        nomeAutor: 1,
        visibilidade: 1,
        ratings: { $ifNull: [[{ $avg: "$ratings.rating" }, 0], 0] },
        dataUltimaMod: 1,
        //tamanho: { $sum: "$ficheiros.size" },
        tamanho: 1,
        nrDownloads: 1,
      },
    },
  ]).sort("-dataUltimaMod");
};

// pesquisar recursos por autor
module.exports.pesquisarPorAutor = (nome, meus_recursos) => {
  var nomeAutor = { $regex: nome, $options: "i" };
  var matchObj;

  if (meus_recursos) matchObj = { idAutor: meus_recursos, nomeAutor };
  else matchObj = { nomeAutor };

  return Recurso.aggregate([
    { $match: matchObj },
    {
      $project: {
        _id: 1,
        titulo: 1,
        tipo: 1,
        idAutor: 1,
        nomeAutor: 1,
        visibilidade: 1,
        ratings: { $ifNull: [{ $round: [{ $avg: "$ratings.rating" }, 0] }, 0] },
        dataUltimaMod: 1,
        tamanho: 1,
        nrDownloads: 1,
      },
    },
  ]).sort("-dataUltimaMod");
};

// pesquisar recursos por título
module.exports.pesquisarPorTitulo = (titulo, meus_recursos) => {
  var titulo = { $regex: titulo, $options: "i" };
  var matchObj;

  if (meus_recursos) matchObj = { idAutor: meus_recursos, titulo };
  else matchObj = { titulo };

  return Recurso.aggregate([
    { $match: matchObj },
    {
      $project: {
        _id: 1,
        titulo: 1,
        tipo: 1,
        idAutor: 1,
        nomeAutor: 1,
        visibilidade: 1,
        ratings: { $ifNull: [{ $round: [{ $avg: "$ratings.rating" }, 0] }, 0] },
        dataUltimaMod: 1,
        tamanho: 1,
        nrDownloads: 1,
      },
    },
  ]).sort("-dataUltimaMod");
};

// pesquisar recursos por tipo
module.exports.pesquisarPorTipo = (tipo, meus_recursos) => {
  var tipo = { $regex: tipo, $options: "i" };
  var matchObj;

  if (meus_recursos) matchObj = { idAutor: meus_recursos, tipo };
  else matchObj = { tipo };

  return Recurso.aggregate([
    { $match: matchObj },
    {
      $project: {
        _id: 1,
        titulo: 1,
        tipo: 1,
        idAutor: 1,
        nomeAutor: 1,
        visibilidade: 1,
        ratings: { $ifNull: [{ $round: [{ $avg: "$ratings.rating" }, 0] }, 0] },
        dataUltimaMod: 1,
        tamanho: 1,
        nrDownloads: 1,
      },
    },
    { $sort: { dataUltimaMod: -1 } },
  ]);
};

module.exports.consultar = (id) => {
  return Recurso.findOne(
    { _id: id },
    {
      _id: 1,
      titulo: 1,
      tipo: 1,
      descricao: 1,
      dataCriacao: 1,
      dataRegisto: 1,
      dataUltimaMod: 1,
      idAutor: 1,
      nomeAutor: 1,
      visibilidade: 1,
      ratings: 1,
      tamanho: 1,
      ficheiros: 1,
      nrDownloads: 1,
    }
  ).exec();
};

module.exports.classificar = (idRecurso, rating) => {
  return Recurso.findOneAndUpdate(
    { _id: idRecurso },
    { $push: { ratings: rating } },
    { useFindAndModify: false, new: true }
  );
};

module.exports.atualizarClassificacao = (idRecurso, rating) => {
  return Recurso.findOneAndUpdate(
    { _id: idRecurso, "ratings.user": rating.user },
    { $set: { "ratings.$.rating": rating.rating } },
    { useFindAndModify: false, new: true }
  );
};

module.exports.editar = function (id,r) {
  return Recurso.findByIdAndUpdate({ _id: id }, r, { new: true })
};


module.exports.consultarTitulo = (id) => {
  return Recurso.findOne({ _id: id }, { titulo: 1, _id: 0 }).exec();
};


module.exports.incrementarDownloads = (id) => {
  return Recurso.findOneAndUpdate(
    { _id: id },
    { $inc: { nrDownloads: 1 } },
    { useFindAndModify: false, new: true }
  );
};


module.exports.inserir = (recurso) => {
  var novoRec = new Recurso(recurso);
  return novoRec.save();
};

module.exports.remover = function (id) {
  return Recurso.deleteOne({ _id: id });
};

module.exports.alterar = function (r) {
  return Recurso.findByIdAndUpdate({ _id: r._id }, r, { new: true });
};
