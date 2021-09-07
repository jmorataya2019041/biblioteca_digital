'use strict'
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PrestamoSchema = Schema({
    usuario: {type: Schema.Types.ObjectId, ref: "usuario"},
    bibliografia: {type: Schema.Types.ObjectId, ref: "bibliografia"},
    fecha_inicial: Date,
    fecha_final: Date,
    estado: Boolean
})

module.exports = mongoose.model('prestamo', PrestamoSchema)