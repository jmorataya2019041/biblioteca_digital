'use strict'
const express = require("express");
const md_autenticacion = require("../middlewares/authenticated")
const adminController = require("../controllers/admin.controller")

var api = express.Router();
api.post('/agregarUsuario', md_autenticacion.ensureAuth, adminController.agregarUsuario)
api.get('/obtenerUsuario/:idUsuario', md_autenticacion.ensureAuth, adminController.obtenerUsuario)
api.get('/obtenerUsuarios', md_autenticacion.ensureAuth, adminController.obtenerUsuarios)
api.put('/editarUsuario/:idUsuario', md_autenticacion.ensureAuth, adminController.editarUsuario)
api.delete('/eliminarUsuario/:idUsuario', md_autenticacion.ensureAuth, adminController.eliminarUsuario)
api.post('/agregarTipo_Bibliografia', adminController.agregarTipo_Bibliografia)
api.get('/tiposBibliografia', md_autenticacion.ensureAuth, adminController.tiposBibliografia)
api.post('/agregarLibro', md_autenticacion.ensureAuth, adminController.agregarLibro)
api.put('/editarLibro/:idLibro', md_autenticacion.ensureAuth, adminController.editarLibro)
api.delete('/eliminarLibro/:idLibro', md_autenticacion.ensureAuth, adminController.eliminarLibro)
api.post('/agregarRevista', md_autenticacion.ensureAuth, adminController.agregarRevista)
api.put('/editarRevista/:idRevista', md_autenticacion.ensureAuth, adminController.editarRevista)
api.delete('/eliminarRevista/:idRevista', md_autenticacion.ensureAuth, adminController.eliminarRevista)
api.get('/prestamosUsuario/:idUsuario', md_autenticacion.ensureAuth, adminController.prestamoUsuario)
api.get('/prestamos', md_autenticacion.ensureAuth, adminController.prestamos)

module.exports = api;