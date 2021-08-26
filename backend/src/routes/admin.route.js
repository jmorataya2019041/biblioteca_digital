'use strict'
const express = require("express");
const md_autenticacion = require("../middlewares/authenticated")
const adminController = require("../controllers/admin.controller")

var api = express.Router();
api.post('/agregarUsuario', md_autenticacion.ensureAuth, adminController.agregarUsuario)

module.exports = api;