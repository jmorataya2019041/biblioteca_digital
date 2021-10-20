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
api.get('/prestarBibliografia/:idBibliografia', md_autenticacion.ensureAuth, usuarioController.prestarBibliografia)
api.get('/devolverLibro/:idPrestamo', md_autenticacion.ensureAuth, usuarioController.devolverLibro)
api.get('/misPrestamos', md_autenticacion.ensureAuth, usuarioController.misPrestamos)
api.get('/miHistorial', md_autenticacion.ensureAuth, usuarioController.miHistorial)
api.get('/buscarLibro/:term', usuarioController.buscarLibro)
api.get('/obtenerIdentidad', usuarioController.obtenerIdentidad)

module.exports = api;