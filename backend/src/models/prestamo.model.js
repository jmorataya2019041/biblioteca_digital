'use strict'
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PrestamoSchema = Schema({
    usuario: {type: Schema.Types.ObjectId, ref: "usuarios"},
    bibliografia: {type: Schema.Types.ObjectId, ref: "bibliografias"},
    estado: Boolean
})

module.exports = mongoose.model('prestamo', PrestamoSchema)