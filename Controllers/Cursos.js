const express = require('express');
const Curso = require('../Models/Curso_Model');
const ruta = express.Router();

ruta.get('/', (req,res)=>{
    res.json('Respuesta a peticion GET de Cursos ejecutandose correctamente...');
});


module.exports = ruta;