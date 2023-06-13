const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const router = express.Router();
const db_connection = require('../database/connection.js');
const bcrypt = require('bcrypt');

router.post('/mdfybajadelegado', function (req, res) {
    // Recoger los datos del formulario de texto
    const campoActualizar = req.body.campoActualizar;
    const password = req.body.password;

    // Recoger el campo de archivo (si lo hay)
    const archivo = req.files && req.files.archivo;

    // Realizar acciones según sea necesario con los campos de texto
    // ...

    // Comprobar si es un campo de contraseña y verificarla con bcrypt
    if (password) {
        const hashedPassword = '$2b$10$YourHashedPassword'; // Obtén la contraseña hasheada almacenada en tu base de datos
        const passwordMatch = bcrypt.compareSync(password, hashedPassword);

        if (passwordMatch) {
            // La contraseña coincide
            // Realizar acciones adicionales según sea necesario
        } else {
            // La contraseña no coincide
            // Realizar acciones adicionales según sea necesario
        }
    }

    // Realizar acciones según sea necesario con el campo de archivo
    if (archivo) {
        // Procesar el archivo adjunto
        // ...
    }

    // Enviar una respuesta al cliente
    res.send('¡Formulario enviado exitosamente!');
});

router.post('/mdfybajasequipo', (req, res) => {

});

router.post('/mdfybajasjugador', (req, res) => {

});