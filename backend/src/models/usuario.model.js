'use strict'
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    CUI: String,
    nombre: String,
    apellido: String,
    usuario: String,
    email: String,
    rol: String,
    password: String,
    image: {type: String, default: "ImageAvatar"}
})

module.exports = mongoose.model('usuario', UsuarioSchema)