require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConection } = require('./database/config');

// Crear el servidor
const app = express();

// Configurar CORS
app.use( cors() );

// lectura y parseo del body
app.use( express.json() );

dbConection();

// Rutas
app.use( '/api/usuarios', require('./routes/usuarios'));
app.use( '/api/login', require('./routes/auth'));

app.listen( process.env.PORT, ()=>{
    console.log(`El servidor esta corriendo en el puerto ${process.env.PORT}`);
});