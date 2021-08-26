'use strict'
const Usuario = require("../models/usuario.model");
const bcrypt = require("bcrypt-nodejs");

//Función para crear al administrador
async function adminDefault(CUI, nombre, apellido, usuario, email, rol, password){
    var usuarioModel = new Usuario();
    if(CUI && nombre && apellido && usuario && email && rol && password){
        usuarioModel.CUI = CUI;
        usuarioModel.nombre = nombre;
        usuarioModel.apellido = apellido;
        usuarioModel.usuario = usuario;
        usuarioModel.email = email;
        usuarioModel.rol = rol;
        usuarioModel.password = password;

        await Usuario.find({$or: [
            {CUI: usuarioModel.CUI},
            {nombre: usuarioModel.nombre},
            {apellido: usuarioModel.apellido},
            {usuario: usuarioModel.usuario},
            {email: usuarioModel.email},
            {rol: usuarioModel.rol},
        ]}).exec((err, admin) => {
            if(err){
                return res.status(500).send({mensaje: "Error en la petición"})
            }else if(admin && admin.length >= 1){
                console.log("El administrador ya existe!");
            }else{
                bcrypt.hash(usuarioModel.password, null, null, (err, passEncrypt) => {
                    usuarioModel.password = passEncrypt;
                    usuarioModel.save((err, adminSave) => {
                        if(err){
                            console.log("Error en la petición al guardar el administrador");
                        }else if(!adminSave){
                            console.log("No se pudo almacenar el administrador");
                        }else{
                            console.log(adminSave);
                        }
                    })
                })
            }
        })
    }else{
        console.log("No ha ingresado todos los parámetros");
    }
}

//Función para agregar un usuario
async function agregarUsuario(req, res){
    if(req.user.rol === "admin"){
        var usuarioModel = new Usuario();
        var params = req.body;
        if(params.CUI && params.nombre && params.apellido && params.usuario && params.email && params.rol && params.password){
            usuarioModel.CUI = params.CUI;
            usuarioModel.nombre = params.nombre;
            usuarioModel.apellido = params.apellido;
            usuarioModel.usuario = params.usuario;
            usuarioModel.email = params.email;
            usuarioModel.rol = params.rol;

            await Usuario.find({$or: [
                {CUI: usuarioModel.CUI},
                {usuario: usuarioModel.usuario},
                {email: usuarioModel.email}
            ]}).exec((err, usuarioVisto) => {
                if(err){
                    return res.status(500).send({ mensaje: "Error en la petición" })
                }else if(usuarioVisto && usuarioVisto.length >= 1){
                    return res.status(500).send({ mensaje: "Usuario Existente!!!"})
                }else{
                    bcrypt.hash(params.password, null, null, (err, passEncrypt) => {
                        usuarioModel.password = passEncrypt;
                        usuarioModel.save((err, userSave) => {
                            if(err){
                                return res.status(500).send({ mensaje: "Error en la petición al guardar al usuario" })
                            }else if(!userSave){
                                return res.status(500).send({ mensaje: "No se ha podido agregar al usuario"})
                            }else{
                                return res.status(200).send({userSave})
                            }
                        })
                    })
                }
            })
        }else{
            return res.status(500).send({ mensaje: "No ha completado todos los parámetros"})
        }
    }else{
        return res.status(500).send({ mensaje: "No tiene el rol de autorización"})
    }
}

module.exports = {
    adminDefault,
    agregarUsuario
}