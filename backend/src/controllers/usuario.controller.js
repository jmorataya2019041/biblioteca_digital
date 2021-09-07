'use strict'
const Usuario = require("../models/usuario.model");
const bcrypt = require("bcrypt-nodejs");
const Prestamo = require("../models/prestamo.model")
const Bibliografia = require("../models/bibliografia.model")
const Datos_Revista = require("../models/datos_revista.model")

//Función para registrarse
async function registro(req, res){
    var usuarioModel = new Usuario();
    var params = req.body;
    if(params.CUI && params.nombre && params.apellido && params.usuario && params.email && params.password){
        usuarioModel.CUI = params.CUI;
        usuarioModel.nombre = params.nombre;
        usuarioModel.apellido = params.apellido;
        usuarioModel.usuario = params.usuario;
        usuarioModel.email = params.email;
        usuarioModel.rol = 'Estudiante';

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
                    usuarioModel.save((err, usuarioSave) => {
                        if(err){
                            return res.status(500).send({ mensaje: "Error en la petición al guardar al usuario"})
                        }else if(!usuarioSave){
                            return res.status(500).send({ mensaje: "No se ha podido almacenar el usuario"})
                        }else{
                            return res.status(200).send({usuarioSave})
                        }
                    })
                })
            }
        })
    }else{
        return res.status(500).send({ mensaje: "No ha completado todos los parámetros"})
    }
}

//Función para obtener mi usuario
async function miUsuario(req, res){
    await Usuario.findById(req.user.sub, (err, miUsuario) => {
        if(err){
            return res.status(500).send({ mensaje: "Error en la petición"})
        }else if(!miUsuario){
            return res.status(500).send({ mensaje: "No se ha podido obtener el usuario"})
        }else{
            return res.status(200).send({miUsuario})
        }
    })
}

//Función para editar mi usuario
async function editarMiUsuario(req, res){
    var params = req.body;
    delete params.password;
    await Usuario.findByIdAndUpdate(req.user.sub, params, {new: true}, (err, userEdit) => {
        if(err){
            return res.status(500).send({ mensaje: "Error en la petición"})
        }else if(!userEdit){
            return res.status(500).send({ mensaje: "No se ha podido editar el usuario"})
        }else{
            return res.status(200).send({userEdit})
        }
    })
}

//Función para eliminar mi usuario
async function eliminarMiUsuario(req, res){
    await Usuario.findByIdAndDelete(req.user.sub, (err, userDelete) => {
        if(err){
            return res.status(500).send({ mensaje: "Error en la petición"})
        }else if(!userDelete){
            return res.status(500).send({ mensaje: "No se ha podido eliminar el usuario"})
        }else{
            return res.status(200).send({userDelete})
        }
    })
}

//Función para obtener los libros
async function obtenerLibros(req, res){
    await Bibliografia.find({tipo_bibliografia: "612abdbce30c2e1d208cc194"}).populate('tipo_bibliografia').exec((err, libros) => {
        if(err){
            return res.status(500).send({ mensaje: "Error en la petición"})
        }else if(!libros){
            return res.status(500).send({ mensaje: "No se ha podido obtener los libros"})
        }else{
            return res.status(200).send({libros})
        }
    })
}

//Función para obtener las revistas
async function obtenerRevistas(req, res){
    await Datos_Revista.find().populate('bibliografia').exec((err, revistas) => {
        if(err){
            return res.status(500).send({ mensaje: "Error en la petición"})
        }else if(!revistas){
            return res.status(500).send({ mensaje: "No se ha podido obtener las revistas"})
        }else{
            return res.status(200).send({revistas})
        }
    })
}

//Función para obtener todas las bibliografías
async function bibliografias(req, res){
    await Bibliografia.find().populate('tipo_bibliografia').exec((err, bibliografias) => {
        if(err){
            return res.status(500).send({ mensaje: "Error en la petición"})
        }else if(!bibliografias){
            return res.status(500).send({ mensaje: "No se ha podido obtener las bibliografías"})
        }else{
            return res.status(200).send({bibliografias})
        }
    })
}

//Función para prestar una bibliografía
async function prestarBibliografia(req, res){
    var params = req.body;
    var prestamoModel = new Prestamo();
    
    var prestadosActual = await Prestamo.find({usuario: req.user.sub}) // ---> Se obtiene la cantidad permitado de préstamos para el usuario
    
    if(prestadosActual.length > 10){
        return res.status(500).send({mensaje: "No tiene espacio para otro préstamo"})
    }else{
        if(params.bibliografia){

            var disponiblesLibro = await Bibliografia.findById(params.bibliografia) // ---> Se obtiene la cantidad de disponibles del libro
            if(disponiblesLibro.disponibles === 0){
                return res.status(200).send({mensaje: "El libro no está disponible"})
            }

            prestamoModel.usuario = req.user.sub;
            prestamoModel.bibliografia = params.bibliografia;
            prestamoModel.fecha_inicial = new Date(Date.now());
            prestamoModel.fecha_final = null;
            prestamoModel.estado = false;

            await Prestamo.find({$or: [
                {bibliografia: prestamoModel.bibliografia}
            ]}).exec((err, prestamo) => { 
                if(err){
                    return res.status(500).send({ mensaje: "Error en la petición" })
                }else if(prestamo && prestamo.length >= 1){
                    return res.status(500).send({mensaje: "El libro ya ha sido prestado"})
                }else{
                    prestamoModel.save((err,prestamo) => {
                        if(err){
                            return res.status(500).send({ mensaje: "Error en la petición al guardar"})
                        }else if(!prestamo){
                            return res.status(500).send({ mensaje: "No se ha podido almacenar el préstamo"})
                        }else{
                            return res.json(prestamo)
                        }
                    })
                }
            })
            await Usuario.findOneAndUpdate({_id: req.user.sub}, {$inc: {n_prestamos: + 1}});
            await Bibliografia.findOneAndUpdate({_id: params.bibliografia}, {$inc: {disponibles: - 1}})
        }else{
            return res.status(500).send({ mensaje: "No ha completado todos los parámetros"})
        }
    }
}

//Función para ver mis préstamos
async function misPrestamos(req, res){
    await Prestamo.find({usuario: req.user.sub}).populate('usuario bibliografia').exec((err, misPrestamos) => {
        if(err){
            console.log(err);
            return res.status(500).send({ mensaje: "Error en la petición"})
        }else if(!misPrestamos){
            return res.status(500).send({ mensaje: "No se ha podido obtener los préstamos"})
        }else{
            return res.status(200).send({misPrestamos})
        }
    })
}

module.exports = {
    registro,
    miUsuario,
    editarMiUsuario,
    eliminarMiUsuario,
    obtenerLibros,
    obtenerRevistas,
    bibliografias,
    prestarBibliografia,
    misPrestamos,
    miHistorial
}