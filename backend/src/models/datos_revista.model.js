'use strict'
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Datos_RevistaSchema = Schema({
    frecuencia_actual: String,
    ejemplares: Number,
    bibliografia: {type: Schema.Types.ObjectId, ref: "bibliografia"}
})

module.exports = mongoose.model("datos_revista", Datos_RevistaSchema)