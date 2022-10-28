const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    titulo:{
        type:String,
        required: true
    },
    descripcion: {
        type:String,
        required:false
    },
    estado: {
        type:Boolean,
        default: true
    },
    image: {
        type:String,
        required: false
    },
    alumnos: {
        type: Number,
        default: 0
    },
    calificacion:{
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Curso', cursoSchema);