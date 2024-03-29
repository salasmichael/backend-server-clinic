require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');

const { dbConection } = require('./database/config');

// Crear el servidor
const app = express();

// Configurar CORS
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Carpeta publica
app.use( express.static('public') );

// lectura y parseo del body
app.use( express.json() );

dbConection();

// Rutas
app.use( '/api/usuarios', require('./routes/usuarios'));
app.use( '/api/hospitales', require('./routes/hospitales'));
app.use( '/api/medicos', require('./routes/medicos'));
app.use( '/api/todo', require('./routes/busquedas'));
app.use( '/api/upload', require('./routes/uploads'));
app.use( '/api/login', require('./routes/auth'));

app.get('*', (req,res)=>{
    res.sendFile( path.resolve(__dirname,'public/index.html') );
});


app.listen( process.env.PORT, ()=>{
    console.log(`El servidor esta corriendo en el puerto ${process.env.PORT}`);
});