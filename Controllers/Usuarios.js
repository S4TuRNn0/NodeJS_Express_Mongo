const express = require('express');
const Usuario = require('../Models/Usuario_Model');
const ruta = express.Router();

ruta.get('/', (req,res)=>{
    res.json('Respueta a peticion GET de Usuarios ejecutandose correctamente...');
});

module.exports = ruta;