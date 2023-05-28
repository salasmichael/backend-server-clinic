require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConection } = require('./database/config');

// Crear el servidor
const app = express();

// Configurar CORS
app.use( cors() );

dbConection();

app.get( '/', (req, res)=>{
    
    res.json({
        status:'ok',
        'msg':'Hola mundo'
    });

})


app.listen( process.env.PORT, ()=>{
    console.log(`El servidor esta corriendo en el puerto ${process.env.PORT}`);
});