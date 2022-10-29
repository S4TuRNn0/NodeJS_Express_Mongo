const express = require('express');
const Curso = require('../Models/Curso_Model');
const ruta = express.Router();


//Endpoint Tipo GET Para Recurso CURSOS
ruta.get('/', (req,res)=>{
   let resultado = listarCursosActivos();
   resultado.then(cursos =>{
     res.json(cursos);
     }).catch(err => {
     res.status(400).json(err);
   })
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

// Funcion Asincrona Para inactivar CURSOS

async function desactivarCursos(id){
    let curso = await Curso.findByIdAndUpdate(id, {
        $set:{
            estado: false
        }

    }, {new: true});
    return curso;
}
// Endpoint Tipo DELETE Para El Recurso CURSOS
ruta.delete('/:id', (req, res) => {
    let resultado = desactivarCursos(req.params.id);
    resultado.then(curso => {
        res.json(curso);
    }).catch(err => {
        res.status(400).json(err);
    })
})

// Funcion Asincrona Para listar CURSOS activos

async function listarCursosActivos(){
    let cursos = await Curso.find({ "estado": true});
    return cursos;
}


