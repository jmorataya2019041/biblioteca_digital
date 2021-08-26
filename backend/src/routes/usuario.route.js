'use strict'
const express = require("express")
const usuarioController = require("../controllers/usuario.controller");
const md_autenticacion = require("../middlewares/authenticated")

var api = express.Router();
api.post('/registro', usuarioController.registro);
api.get('/miUsuario', md_autenticacion.ensureAuth, usuarioController.miUsuario)
api.put('/editarMiUsuario', md_autenticacion.ensureAuth, usuarioController.editarMiUsuario)
api.delete('/eliminarMiUsuario', md_autenticacion.ensureAuth, usuarioController.eliminarMiUsuario)

module.exports = api;