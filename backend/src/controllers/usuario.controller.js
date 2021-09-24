'use strict'
const Usuario = require("../models/usuario.model");
const bcrypt = require("bcrypt-nodejs");
const Prestamo = require("../models/prestamo.model")
const Bibliografia = require("../models/bibliografia.model")
const Datos_Revista = require("../models/datos_revista.model")
const jwt = require("jwt-simple");

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
    
    var prestadosActual = await Prestamo.find({usuario: req.user.sub, estado: false}) // ---> Se obtiene la cantidad permitado de préstamos para el usuario
    
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

            await Prestamo.find({usuario: req.user.sub, $or: [
                {bibliografia: prestamoModel.bibliografia}
            ]}).exec((err, prestamo) => { 
                if(err){
                    return res.status(500).send({ mensaje: "Error en la petición" })
                }else if(prestamo && prestamo.length >= 1){
                    return res.status(500).send({mensaje: "Usted ya ha prestado esta bibliografía"})
                }else{
                    prestamoModel.save((err,prestamo) => {
                        if(err){
                            return res.status(500).send({ mensaje: "Error en la petición al guardar"})
                        }else if(!prestamo){
                            return res.status(500).send({ mensaje: "No se ha podido almacenar el préstamo"})
                        }else{
                            Usuario.findOneAndUpdate({_id: req.user.sub}, {$inc: {n_prestamos: + 1}}, {new: true}, (err, usuario) => {
                                if(err){
                                    return res.status(500).send({ mensaje: "Error en la petición del usuario"})
                                }else if(!usuario){
                                    return res.status(500).send({ mensaje: "No se ha podido editar el usuario"})
                                }else{
                                    console.log(usuario);
                                }
                            });
                            Bibliografia.findByIdAndUpdate(disponiblesLibro._id, {$inc: {disponibles: - 1}}, {new: true}, (err, libro) => {
                                if(err){
                                    return res.status(500).send({ mensaje: "Error en la petición del libro"})
                                }else if(!libro){
                                    return res.status(500).send({ mensaje: "No se ha podido editar el libro"})
                                }else{
                                    console.log(libro);
                                }
                            })
                            return res.status(200).send({prestamo})
                        }
                    })
                }
            })
        }else{
            return res.status(500).send({ mensaje: "No ha completado todos los parámetros"})
        }
    }
}

//Función para devolver la bibliografia
async function devolverLibro(req, res){
    var idPrestamo = req.params.idPrestamo;
    var prestamo = await Prestamo.findById(idPrestamo);
    if(prestamo.estado === true){
        return res.status(500).send({mensaje: "El libro ya fue devuelto"})
    }
    if(prestamo.usuario == req.user.sub){
        await Prestamo.findByIdAndUpdate(idPrestamo, {fecha_final: new Date(Date.now()), estado: true}, {new: true}, (err, libroDevuelto) => {
            if(err){
                return res.status(500).send({ mensaje: "Error en la petición"})
            }else if(!libroDevuelto){
                return res.status(500).send({ mensaje: "No se ha podido devolver el libro"})
            }else{
                Bibliografia.findByIdAndUpdate(prestamo.bibliografia, {$inc: {disponibles: +1}}, {new: true}, (err, bibliografia) => {
                    if(err){
                        return res.status(500).send({ mensaje: "Error en la petición al devolver el libro"})
                    }else if(!bibliografia){
                        return res.status(500).send({mensaje: "No se ha podido devolver el libro"})
                    }else{
                        console.log(bibliografia);
                    }
                })
                console.log(libroDevuelto);
                return res.status(200).send({mensaje: "El libro se ha devuelto"})
            }
        })
    }else{
        return res.status(500).send({mensaje: "Este préstamo no le pertenece"})
    }
}

//Función para ver mis préstamos pendientes
async function misPrestamos(req, res){
    await Prestamo.find({usuario: req.user.sub, estado: false}).populate('usuario bibliografia').exec((err, misPrestamos) => {
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

//Función para obtener mi historial
async function miHistorial(req, res){
    await Prestamo.find({usuario: req.user.sub}).populate('usuario bibliografia').exec((err, historial) => {
        if(err){
            return res.status(500).send({ mensaje: "Error en la petición"})
        }else if(!historial){
            return res.status(500).send({ mensaje: "No se ha podido obtener el historial"})
        }else{
            return res.status(200).send({historial})
        }
    })
}

//Función para buscar un libro por su nombre
async function buscarLibro(req, res){
    try{
        var texto = req.params.term;

        var libro = await Bibliografia.aggregate([
            {
                $match: { titulo: { $regex: texto, $options: 'i' } }
            }
        ])

        return res.status(200).send({Libro: libro})
    } catch(error){
        return res.status(500).send({error})
    }
}

//Función para obtener la identidad
async function obtenerIdentidad(req, res){
    let x = jwt.decode(req.headers["authorization"], "Biblioteca_Digital")
    res.json(x);
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
    devolverLibro,
    misPrestamos,
    miHistorial,
    buscarLibro,
    obtenerIdentidad
}