const usuarios = require('./Controllers/usuarios');
const cursos = require('./Controllers/cursos');



const express = require('express');
const mongoose = require('mongoose');

//Conexion a la DB De MongoDb
mongoose.connect('mongodb://localhost:27017/userscoursesdb', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Conectado a MongoDb...'))
  .catch(err => console.log('No se pudo realizar la conexion...', err));

//Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//End Points (recursos)
app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Api Rest Ok, y ejecutandose ...');
})

