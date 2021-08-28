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
api.post("/agregarTipo_Bibliografia", adminController.agregarTipo_Bibliografia)

module.exports = api;