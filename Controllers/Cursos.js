const express = require('express');
const Curso = require('../Models/Curso_Model');
const ruta = express.Router();

ruta.get('/', (req,res)=>{
    res.json('Respuesta a peticion GET de Cursos ejecutandose correctamente...');
});


module.exports = ruta;
//Endpoint Tipo POST Para Recurso CURSOS
ruta.post('/',(req, res)=>{
    let resultado = crearCurso(req.body);

    resultado.then(curso =>{
        res.json({
            curso
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    })
});

async function crearCurso(body){
    let curso = new Curso({
        titulo  :body.titulo,
        descripcion :body.descripcion,
        alumnos :body.alumnos,
        calificacion    :body.calificacion
    });
    return await curso.save();
}
// Funcion Asincrona Para Actualizar CURSOS
async function actualizarCurso(id, body){
    let curso = await Curso.findByIdAndUpdate(id, {
        $set:{
            titulo: body.titulo,
            descripcion: body.descripcion
        }
    }, {new: true});
    return curso;
}
//Endpoint Tipo PUT Para El Recurso CURSOS
ruta.put('/:id', (req, res) =>{
    let resultado = actualizarCurso(req.params.id, req.body);
    resultado.then(curso => {
        res.json(curso)
    }).catch(err =>{
        res.status(400).json(err)
    })
})



