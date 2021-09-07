'use strict'
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PrestamoSchema = Schema({
    usuario: {type: Schema.Types.ObjectId, ref: "usuario"},
    bibliografia: {type: Schema.Types.ObjectId, ref: "bibliografia"},
    fecha_prestamo: Date,
    estado: Boolean
})

module.exports = mongoose.model('prestamo', PrestamoSchema)