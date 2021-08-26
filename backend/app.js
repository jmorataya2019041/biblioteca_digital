'use strict'

//Variables globales
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors")
const morgan = require("morgan");

//Cabeceras
app.use(cors());

//Importación de rutas
const login_rutas = require("./src/routes/login.route")


//Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan("dev"));

//Utilización de rutas
app.use("/Biblioteca_Digital", login_rutas)


//Exportación
module.exports = app;