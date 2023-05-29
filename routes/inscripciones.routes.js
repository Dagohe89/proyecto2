const express = require('express');
const router = express.Router();
const db_connection = require('../database/connection.js');
const multer = require('multer');

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define la carpeta de destino donde se guardarán los archivos
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    // Define el nombre del archivo en el servidor
    cb(null, file.originalname);
  }
});

// Inicializa Multer
const upload = multer({ storage: storage });

router.post('/nuevo_delegado', upload.single('foto'), (req, res) => {
  const { nombre, apellido1, apellido2, dni, usuario, contrasena, repetir_contrasena } = req.body;
  const foto = req.file;
  
  // Validar campos vacíos del formulario de delegado
  if (!nombre || !apellido1 || !apellido2 || !dni || !usuario || !contrasena || !repetir_contrasena || !foto) {
    return res.status(400).json({ error: 'Todos los campos del formulario de delegado son obligatorios' });
  }

  // Realizar validaciones adicionales si es necesario
  
  // Ejemplo de inserción en la base de datos
  const sql = 'INSERT INTO delegado (nombre, apellido1, apellido2, dni, nickname, contraseña, fotodelegadourl) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db_connection.query(sql, [nombre, apellido1, apellido2, dni, usuario, contrasena, foto.filename], (error, results) => {
    if (error) {
      console.error('Error al insertar el delegado:', error);
      return res.status(500).json({ error: 'Error al insertar el delegado' });
    }

    // Delegado insertado exitosamente
    return res.status(200).json({ message: 'Delegado insertado correctamente' });
  });
});

router.post('/nuevo_equipo', upload.single('escudo'), (req, res) => {
  const { nombre, color_camiseta, color_segunda_camiseta, direccion_campo } = req.body;
  const escudo = req.file;

  // Validar campos vacíos del formulario de equipo
  if (!nombre || !color_camiseta || !color_segunda_camiseta || !direccion_campo || !escudo) {
    return res.status(400).json({ error: 'Todos los campos del formulario de equipo son obligatorios' });
  }

  // Realizar validaciones adicionales si es necesario

  // Ejemplo de inserción en la base de datos
  const sql = 'INSERT INTO equipo (nombre, color_camiseta, color_segunda_camiseta, direccion_campo, fotoescudoescudourl) VALUES (?, ?, ?, ?, ?)';
  db_connection.query(sql, [nombre, color_camiseta, color_segunda_camiseta, direccion_campo, escudo.filename], (error, results) => {
    if (error) {
      console.error('Error al insertar el equipo:', error);
      return res.status(500).json({ error: 'Error al insertar el equipo' });
    }

    // Equipo insertado exitosamente
    return res.status(200).json({ message: 'Equipo insertado correctamente' });
  });
});

router.post('/nuevo_jugador', upload.single('foto'), (req, res) => {
  const { nombre, apellido1, apellido2, dni, fecha_nacimiento, dorsal } = req.body;
  const foto = req.file;
  
  // Validar campos vacíos del formulario de jugador
  if (!nombre || !apellido1 || !apellido2 || !dni || !fecha_nacimiento || !dorsal || !foto) {
    return res.status(400).json({ error: 'Todos los campos del formulario de jugador son obligatorios' });
  }

  // Realizar validaciones adicionales si es necesario
  
  // Ejemplo de inserción en la base de datos
  const sql = 'INSERT INTO jugador (nombre, apellido1, apellido2, dni, fechaNacimiento, dorsal, fotojugadorurl) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db_connection.query(sql, [nombre, apellido1, apellido2, dni, fecha_nacimiento, dorsal, foto.filename], (error, results) => {
    if (error) {
      console.error('Error al insertar el jugador:', error);
      return res.status(500).json({ error: 'Error al insertar el jugador' });
    }

    // Jugador insertado exitosamente
    return res.status(200).json({ message: 'Jugador insertado correctamente' });
  });
});

module.exports = router;
