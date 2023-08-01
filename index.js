// Variables de entorno
require('dotenv').config();

//configuracion 
const express = require('express');
//Importar CORS
const cors = require('cors')
//Configracion de la conexion 
const {dbConnection} = require('./database/config') ;

// Crear el servidor
const app = express();

//Configurar CORS
app.use(cors());

//Lectura y Parse del Body
app.use(express.json());

//Base de datos
dbConnection();

// Directorio publico
app.use(express.static('public'));

// Usuario y Contraseña base de datos
// mean_user
// CrZOao77huJzpg2P

//Rutas
app.use('/api/usuarios', require('./routes/usuarios.route'));
app.use('/api/hospitales', require('./routes/hospitales.route'));
app.use('/api/medicos', require('./routes/medicos.route'));
app.use('/api/login', require('./routes/auth.route'));
app.use('/api/todo', require('./routes/busquedas.route'));
app.use('/api/todo', require('./routes/busquedas.route'));
app.use('/api/upload', require('./routes/uploads.route'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto: '+process.env.PORT);
} )

