// Variables de entorno
require('dotenv').config();

//configuracion 
const express = require('express');

//Importar CORS
const cors = require('cors')

//Configracion de la conexion 
const {dbConnection} = require('./database/config');

// Crear el servidor
const app = express();

//Configurar CORS
app.use(cors());

//Base de datos
dbConnection();

// Usuario y Contraseña base de datos
// mean_user
// CrZOao77huJzpg2P

//Rutas
app.get( '/', (req,res)=>{
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
} );

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto: '+process.env.PORT);
} )

