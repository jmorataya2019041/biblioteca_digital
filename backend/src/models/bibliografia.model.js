'use strict'
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var BibliografiaSchema = Schema ({
    autor: String,
    titulo: String,
    edicion: String,
    descripcion: String,
    palabras_clave: String,
    temas: String,
    copias: Number,
    disponibles: Number,
    n_prestado: Number,
    n_busqueda: Number,
    tipo_bibliografia: {type: Schema.Types.ObjectId, ref: "tipo_bibliografia"}
})

module.exports = mongoose.model('bibliografia', BibliografiaSchema)