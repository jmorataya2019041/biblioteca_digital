'use strict'
const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

var HistorialSchema = Schema({
    usuario: {type: Schema.Types.ObjectId, ref: "usuarios"},
    bibliografia: {type: Schema.Types.ObjectId, ref: "bibliografias"},
    fecha_inicial: Date,
    fecha_final: Date,
    estado: Boolean
})

module.exports = mongoose.model("historial", HistorialSchema)