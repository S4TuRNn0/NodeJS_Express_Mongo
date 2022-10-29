const Usuario = require('../Models/Usuario_Model');
const Joi = require('@hapi/joi');

//Validaciones para el objeto usuario
const schema = Joi.object({
    nombre: Joi.string()
    .min(3)
    .max(30)
    .required()
    .pattern(/^[A-Za-záéíóú ]{3,30}$/),

    password: Joi.string()
    .pattern(/^[a-zA-Z0-9 ]{3,30}$/),

    email: Joi.string()
    .email({minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu', 'co'] } })

});

//funcion asincrona para crear objeto de tipo Usuario
async function crearUsuario(body){
    let usuario=new Usuario({
        email      :body.email,
        nombre     :body.nombre,
        password   :body.password  
    });

    return await usuario.save();
}
async function actualizarUsuario(email, body){
    let usuario = await Usuario.findOneAndUpdate({"email": email}, {
       $set:{
          nombre: body.nombre,
          password: body.password
        }       
    }, {new: true});
    return usuario;
}

//Funcion Asincrona Para Inactivar Un Usuari0
async function desactivarUsuario(email){
    let usuario = await Usuario.findOneAndUpdate({"email": email}, {
        $set:{
            estado: false
        }
    }, {new: true});
    return usuario;
}

//Funcion Asìncronica Para Listar Todos Los Usuarios Activos
async function listarUsuarioActivos(){
    let usuarios = await Usuario.find({"estado": true});
    return usuarios;
}

module.exports={
    schema,
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    listarUsuarioActivos
}