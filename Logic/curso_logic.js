const Curso = require('../Models/Curso_Model');
//Funcion asincrona para crear CURSO
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
            descripcion: body.descripcion,
            alumnos:    body.alumnos,
            calificacion:   body.calificacion   

        }
    }, {new: true});
    return curso;
}
// Funcion Asincrona Para inactivar CURSOS
async function desactivarCursos(id){
    let curso = await Curso.findByIdAndUpdate(id, {
        $set:{
            estado: false
        }

    }, {new: true});
    return curso;
}
// Funcion Asincrona Para listar CURSOS activos
async function listarCursosActivos(){
    let cursos = await Curso.find({ "estado": true});
    return cursos;
}

module.exports={
    crearCurso,
    actualizarCurso,
    desactivarCursos,
    listarCursosActivos
}