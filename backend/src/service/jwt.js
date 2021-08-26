'use strict'
var jwt = require("jwt-simple");
var moment = require("moment");
var secret = 'Biblioteca_Digital';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        CUI: user.CUI,
        nombre: user.nombre,
        apellido: user.apellido,
        usuario: user.usuario,
        email: user.email,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().date(40, 'days').unix()
    }

    return jwt.encode(payload, secret)
}