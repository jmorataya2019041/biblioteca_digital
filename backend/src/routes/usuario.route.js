'use strict'
const express = require("express")
const usuarioController = require("../controllers/usuario.controller");
const md_autenticacion = require("../middlewares/authenticated")

var api = express.Router();
api.post('/registro', usuarioController.registro);
api.get('/miUsuario', md_autenticacion.ensureAuth, usuarioController.miUsuario)
api.put('/editarMiUsuario', md_autenticacion.ensureAuth, usuarioController.editarMiUsuario)
api.delete('/eliminarMiUsuario', md_autenticacion.ensureAuth, usuarioController.eliminarMiUsuario)
api.get('/obtenerLibros', usuarioController.obtenerLibros)
api.get('/obtenerRevistas', usuarioController.obtenerRevistas)
api.get('/bibliografias', usuarioController.bibliografias)
api.post('/prestarBibliografia', md_autenticacion.ensureAuth, usuarioController.prestarBibliografia)
api.get('/misPrestamos', md_autenticacion.ensureAuth, usuarioController.misPrestamos)
api.get('/miHistorial', md_autenticacion.ensureAuth, usuarioController.miHistorial)

module.exports = api;