'use strict'
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Tipo_BibliografiaSchema = Schema({
    tipo: String
})

module.exports = mongoose.model("tipo_bibliografia", Tipo_BibliografiaSchema)