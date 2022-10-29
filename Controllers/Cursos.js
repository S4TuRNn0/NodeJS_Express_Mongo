const express = require('express');
const logic = require('../Logic/curso_logic');
const ruta = express.Router();


//Endpoint Tipo GET Para Recurso CURSOS
ruta.get('/', (req,res)=>{
   let resultado = logic.listarCursosActivos();
   resultado.then(cursos =>{
     res.json(cursos);
    }).catch(err => {
     res.status(400).json(err);
   })
})

//Endpoint Tipo POST Para Recurso CURSOS
ruta.post('/',(req, res)=>{
    let resultado = logic.crearCurso(req.body);

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


//Endpoint Tipo PUT Para El Recurso CURSOS
ruta.put('/:id', (req, res) =>{
    let resultado = logic.actualizarCurso(req.params.id, req.body);
    resultado.then(curso => {
        res.json(curso)
    }).catch(err =>{
        res.status(400).json(err)
    })
})
// Endpoint Tipo DELETE Para El Recurso CURSOS
ruta.delete('/:id', (req, res) => {
    let resultado = logic.desactivarCursos(req.params.id);
    resultado.then(curso => {
        res.json(curso);
    }).catch(err => {
        res.status(400).json(err);
    })
});

module.exports = ruta;


