'use strict'
const Usuario = require("../models/usuario.model");
const Tipo_Bibliografia = require("../models/tipo_bibliografia.model")
const Bibliografia = require("../models/bibliografia.model")
const Datos_Revista = require("../models/datos_revista.model")
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

//Función para obtener el usuario
async function obtenerUsuario(req, res){
    if(req.user.rol === "admin"){
        var idUsuario = req.params.idUsuario;
        await Usuario.findById(idUsuario, (err, usuarioEncontrado) => {
            if(err){
                return res.status(500).send({ mensaje: "Error en la petición"})
            }else if(!usuarioEncontrado){
                return res.status(500).send({ mensaje: "No se ha podido obtener el usuario"})
            }else{
                return res.status(200).send({usuarioEncontrado})
            }
        })
    }else{
        return res.status(500).send({ mensaje: "No tiene el rol de autorización"})
    }
}

//Función para obtener a todos los usuarios
async function obtenerUsuarios(req, res){
    if(req.user.rol === "admin"){
        await Usuario.find({rol: {$in: ["Bibliotecario", "Estudiante"]}}, (err, usuarios) => {
            if(err){
                return res.status(500).send({ mensaje: "Error en la petición"})
            }else if(!usuarios){
                return res.status(500).send({ mensaje: "No se ha podido obtener los usuarios"})
            }else{
                return res.status(200).send({usuarios})
            }
        })
    }else{
        return res.status(500).send({ mensaje: "No tiene el rol de autorización"})
    }
}

//Función para editar cualquier usuario
async function editarUsuario(req, res){
    if(req.user.rol === "admin"){
        var params = req.body;
        var idUsuario = req.params.idUsuario;
        delete params.CUI;
        delete params.image;
        delete params.password;

        await Usuario.findByIdAndUpdate(idUsuario, params, {new: true}, (err, usuarioEliminado) => {
            if(err){
                return res.status(500).send({ mensaje: "Error en la petición"})
            }else if(!usuarioEliminado){
                return res.status(500).send({ mensaje: "No se ha podido eliminar el usuario"})
            }else{
                return res.status(200).send({usuarioEliminado})
            }
        })
    }else{
        return res.status(500).send({ mensaje: "No tiene el rol de autorización"})
    }
}

//Función para eliminar cualquier usuario
async function eliminarUsuario(req, res){
    if(req.user.rol === "admin"){
        var idUsuario = req.params.idUsuario;
        await Usuario.findByIdAndDelete(idUsuario, (err, usuarioEliminado) => {
            if(err){
                return res.status(500).send({ mensaje: "Error en la petición"})
            }else if(!usuarioEliminado){
                return res.status(500).send({ mensaje: "No se ha podido eliminar el usuario"})
            }else{
                return res.status(200).send({usuarioEliminado})
            }
        })
    }else{
        return res.status(500).send({ mensaje: "No tiene el rol de autorización"})
    }
}

//Función para agregar solamente el tipo revista
async function agregarTipo_Bibliografia(req, res){
    var params = req.body;
    var tipoBibliografiaModel = new Tipo_Bibliografia();
    if(params.tipo){
        tipoBibliografiaModel.tipo = params.tipo;

        await Tipo_Bibliografia.find({or: [
            {tipo: tipoBibliografiaModel.tipo}
        ]}).exec((err, revistaEncontrado) => {
            if(err){
                return res.status(500).send({ mensaje: "Error en la petición" })
            }else if(revistaEncontrado && revistaEncontrado.length >= 1){
                return res.status(500).send({ mensaje: "Ya existe el tipo de bibliografía"})
            }else{
                tipoBibliografiaModel.save((err, tipoGuardado) => {
                    if(err){
                        return res.status(500).send({ mensaje: "Error en la petición al guardar el tipo de bibliografía"})
                    }else if(!tipoGuardado){
                        return res.status(500).send({ mensaje: "No se ha podido guardar el tipo de bibliografía"})
                    }else{
                        return res.status(200).send({tipoGuardado})
                    }
                })
            }
        })
    }else{
        return res.status(500).send({ mensaje: "No ha completado todos los parámetros"})
    }
}

//Función para obtener los tipos de bibliografía
async function tiposBibliografia(req, res){
    if(req.user.rol === "admin"){
        await Tipo_Bibliografia.find((err, bibliografias) => {
            if(err){
                return res.status(500).send({ mensaje: "Error en la petición"})
            }else if(!bibliografias){
                return res.status(500).send({ mensaje: "No se ha podido obtener los tipos de bibliografías"})
            }else{
                return res.status(200).send({bibliografias})
            }
        })
    }else{
        return res.status(500).send({ mensaje: "No tiene el rol de autorización"})
    }
}

//Función para agregar un libro
async function agregarLibro(req, res){
    if(req.user.rol === "admin"){
        var params = req.body;
        var bibliografiaModel = new Bibliografia();
        if(params.autor && params.titulo && params.edicion && params.descripcion && params.palabras_clave && params.temas && params.copias && params.disponibles){
            bibliografiaModel.autor = params.autor;
            bibliografiaModel.titulo = params.titulo;
            bibliografiaModel.edicion = params.edicion;
            bibliografiaModel.descripcion = params.descripcion;
            bibliografiaModel.palabras_clave = params.palabras_clave;
            bibliografiaModel.temas = params.temas;
            bibliografiaModel.copias = params.copias;
            bibliografiaModel.disponibles = params.disponibles;
            bibliografiaModel.tipo_bibliografia = '612abdbce30c2e1d208cc194';

            await Bibliografia.find({$or: [
                {titulo: bibliografiaModel.titulo}
            ]}).exec((err, libro) => {
                if(err){
                    return res.status(500).send({ mensaje: "Error en la petición" })
                }else if(libro && libro.length >= 1){
                    return res.status(500).send({ mensaje: "Libro ya existente"})
                }else{
                    bibliografiaModel.save((err, libroGuardado) => {
                        if(err){
                            return res.status(500).send({ mensaje: "Error en la petición al guardar el libro"})
                        }else if(!libroGuardado){
                            return res.status(500).send({ mensaje: "No se ha podido guardar el libro"})
                        }else{
                            return res.status(200).send({libroGuardado})
                        }
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

//Función para editar un libro
async function editarLibro(req, res){
    if(req.user.rol === "admin"){
        var idLibro = req.params.idLibro;
        var params = req.body;
        delete params.tipo_bibliografia;
        await Bibliografia.findByIdAndUpdate(idLibro, params, {new: true}, (err, libroEditado) => {
            if(err){
                return res.status(500).send({ mensaje: "Error en la petición"})
            }else if(!libroEditado){
                return res.status(500).send({ mensaje: "No se ha podido editar el libro"})
            }else{
                return res.status(200).send({libroEditado})
            }
        })
    }else{
        return res.status(500).send({ mensaje: "No tiene el rol de autorización"})
    }
}

//Función para eliminar un libro
async function eliminarLibro(req, res){
    if(req.user.rol === "admin"){
        var idLibro = req.params.idLibro;
        await Bibliografia.findByIdAndDelete(idLibro, (err, libroEliminado) => {
            if(err){
                return res.status(500).send({ mensaje: "Error en la petición"})
            }else if(!libroEliminado){
                return res.status(500).send({ mensaje: "No se ha podido eliminar el libro"})
            }else{
                return res.status(200).send({libroEliminado})
            }
        })
    }else{
        return res.status(500).send({ mensaje: "No tiene el rol de autorización"})
    }
}

//Función para agregar una revista
async function agregarRevista(req, res){
    if(req.user.rol === "admin"){
        var bibliografiaModel = new Bibliografia();
        var datos_revistaModel = new Datos_Revista();
        var params = req.body;
        if(params.autor && params.titulo && params.edicion && params.descripcion && params.palabras_clave && params.temas && params.copias && params.disponibles && params.frecuencia_actual && params.ejemplares){
            bibliografiaModel.autor = params.autor;
            bibliografiaModel.titulo = params.titulo;
            bibliografiaModel.edicion = params.edicion;
            bibliografiaModel.descripcion = params.descripcion;
            bibliografiaModel.palabras_clave = params.palabras_clave;
            bibliografiaModel.temas = params.temas;
            bibliografiaModel.copias = params.copias;
            bibliografiaModel.disponibles = params.disponibles;
            bibliografiaModel.tipo_bibliografia = '612abdace30c2e1d208cc191';

            await Bibliografia.find({$or: [
                {titulo: bibliografiaModel.titulo}
            ]}).exec((err, revista) => {
                if(err){
                    return res.status(500).send({ mensaje: "Error en la petición" })
                }else if(revista && revista.length >= 1){
                    return res.status(500).send({ mensaje: "La revista es existente"})
                }else{
                    bibliografiaModel.save((err,revistaGuardada) => {
                        if(err){
                            return res.status(500).send({ mensaje: "Error en la petición al guardar"})
                        }else if(!revistaGuardada){
                            return res.status(500).send({ mensaje: "No se ha podido guardar la revista"})
                        }else{
                            datos_revistaModel.frecuencia_actual = params.frecuencia_actual;
                            datos_revistaModel.ejemplares = params.ejemplares;
                            datos_revistaModel.bibliografia = revistaGuardada._id;
                            datos_revistaModel.save((err, save) => {
                                if(err){
                                    return res.status(500).send({ mensaje: "Error en la petición al guardar los datos de la revista"})
                                }else if(!save){
                                    return res.status(500).send({ mensaje: "No se ha podido guardar los datos de la revista"})
                                }else{
                                    console.log(save);
                                }
                            })
                            res.json(revistaGuardada)
                        }
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

//Función para editar una revista
async function editarRevista(req, res){
    if(req.user.rol === "admin"){
        var idRevista = req.params.idRevista;
        var params = req.body;
        delete params.tipo_bibliografia;
        await Datos_Revista.findOneAndUpdate({bibliografia: idRevista}, params, {new: true}, (err, datosEditados)=> {
            if(err){
                return res.status(500).send({ mensaje: "Error en la petición al editar los datos de la revista"})
            }else if(!datosEditados){
                return res.status(500).send({ mensaje: "No se han podido editar los datos de la revista"})
            }else{
                console.log(datosEditados);
            }
        })
        await Bibliografia.findByIdAndUpdate(idRevista, params, {new: true},(err, bibliografiaEditada)=> {
            if(err){
                return res.status(500).send({ mensaje: "Error en la petición al editar la bibliografia"})
            }else if(!bibliografiaEditada){
                return res.status(500).send({ mensaje: "No se ha podido editar la revista"})
            }else{
                return res.status(200).send({bibliografiaEditada})
            }
        })
    }else{
        return res.status(500).send({ mensaje: "No tiene el rol de autorización"})
    }
}

//Función para eliminar una revista
async function eliminarRevista(req, res){
    if(req.user.rol === "admin"){
        var idRevista = req.params.idRevista;
        await Datos_Revista.findOneAndDelete({bibliografia: idRevista}, (err, datosEliminados) => {
            if(err){
                return res.status(500).send({ mensaje: "Error en la petición al eliminar la revista"})
            }else if(!datosEliminados){
                return res.status(500).send({ mensaje: "No se ha podido eliminar los datos de la revista"})
            }else{
                console.log(datosEliminados);
            }
        })
        await Bibliografia.findByIdAndDelete(idRevista, (err, bibliografiaEliminada) => {
            if(err){
                return res.status(500).send({ mensaje: "Error en la petición al eliminar la bibliografia"})
            }else if(!bibliografiaEliminada){
                return res.status(500).send({ mensaje: "No se ha podido eliminar la revista"})
            }else{
                return res.status(200).send({bibliografiaEliminada})
            }
        })
    }else{
        return res.status(500).send({ mensaje: "No tiene el rol de autorización"})
    }
}

module.exports = {
    adminDefault,
    agregarUsuario,
    obtenerUsuario,
    obtenerUsuarios,
    editarUsuario,
    eliminarUsuario,
    agregarTipo_Bibliografia,
    tiposBibliografia,
    agregarLibro,
    editarLibro,
    eliminarLibro,
    agregarRevista,
    editarRevista,
    eliminarRevista
}