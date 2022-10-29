const express = require('express');
const logic = require('../Logic/usuario_logic');
const ruta = express.Router();


//Endpoint De Tipo GET Para Recurso_USUARIOS. Lista todos los usuarios
ruta.get('/', (req,res)=>{
    let resultado = logic.listarUsuarioActivos();
    resultado.then(usuarios =>{
        res.json(usuarios)
    }).catch(err => {
        res.status(400).json(
            {
                err
            }
        )
    })
})

//Endpoints Tipo POST_Usuarios
ruta.post('/', (req,res) => {
    let body = req.body;

    const {error, value} = logic.schema.validate({nombre: body.nombre, email: body.email});
    if(!error){
        let resultado = logic.crearUsuario(body);

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

//Endpoints Tipo PUT_Usuarios
ruta.put('/:email', (req,res) => {
    const {error, value} = logic.schema.validate({nombre: req.body.nombre});
    if(!error){
        let resultado = logic.actualizarUsuario(req.params.email, req.body);
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
})

//Endpoint Tipo DELETE Para Recurso USUARIOS

ruta.delete('/:email', (req,res) =>  {
    let resultado = logic.desactivarUsuario(req.params.email);
    resultado.then(valor => {
        res.json({
            usuario: valor
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    });    

})

module.exports = ruta;



