'use strict'
const mongoose = require("mongoose");
const app = require("./app");
const newAdmin = require('./src/controllers/admin.controller')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ubdhw8jzzr8tsj9cjqiq:5Cb1QMN9PyQweWwatfbi@bckaetqwv0as20d-mongodb.services.clever-cloud.com:27017/bckaetqwv0as20d', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
    console.log("Se encuentra conectado a la base de datos");

    crearAdmin();

    app.listen(3000, function(){
        console.log("Está funcionando en el puerto 3000");
    })

}).catch(err => console.log(err));

//Se creará el administrador
const crearAdmin = () => {
    newAdmin.adminDefault("0000000000000", "adminpractica", "adminpractica", "adminpractica", "adminpractica@kinal.edu.gt", "admin", "adminpractica")
}