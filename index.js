const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');


// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());


//Directorio Público
app.use(express.static('public'));


// Lecturs y parseo del body
app.use(express.json());


// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// El hacer refresh al navegador lo redireccionamos al directorio que deseamos
app.get('*', (req, res) => {                         
    res.sendFile(__dirname + '/public/index.html');
})


// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});