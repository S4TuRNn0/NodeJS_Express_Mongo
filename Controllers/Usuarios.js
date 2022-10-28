const express = require('express');
const Usuario = require('../Models/Usuario_Model');
const ruta = express.Router();

ruta.get('/', (req,res)=>{
    res.json('Respueta a peticion GET de Usuarios ejecutandose correctamente...');
});

module.exports = ruta;

const Joi = require('@hapi/joi');
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

//Endpoints Tipo POST_Usuarios
ruta.post('/', (req,res) => {
    let body = req.body;

    const {error, value} = schema.validate({nombre: body.nombre, email: body.email});
    if(!error){
        let resultado = crearUsuario(body);

        resultado.then( user => {
            res.json({
                valor: user
            })
        }).catch( err => {
            res.status(400).json({
                err
            })
        });

    }else{
        res.status(400).json({
            error
        })
    }
});

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

//Endpoints Tipo PUT_Usuarios
ruta.put('/:email', (req,res) => {
    const {error, value} = schema.validate({nombre: req.body.nombre});
    if(!error){
        let resultado = actualizarUsuario(req.params.email, req.body);
        resultado.then( valor => {
            res.json({
                valor
            })
        }).catch( err => {
            res.status(400).json({
                err
            })
        });

    }else{
        res.status(400).json({
            error
        })
    }
});

//Funcion Asincrona Para Inactivar Un Usuari0
async function desactivarUsuario(email){
    let usuario = await Usuario.findOneAndUpdate({"email": email}, {
        $set:{
            estado: false
        }
    }, {new: true});
    return usuario;
}

//Endpoint Tipo DELETE Para Recurso USUARIOS

ruta.delete('/:email', (req,res) =>  {
    let resultado = desactivarUsuario(req.params.email);
    resultado.then(valor => {
        res.json({
            usuario: valor
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    });    

});