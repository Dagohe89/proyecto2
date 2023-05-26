const express = require('express');
const router = express.Router();
const db_connection = require('../database/connection.js');

router.post('/nuevo_delegado', (req, res) => {
  const { nombre, apellido1, apellido2, dni, usuario, contrasena, repetir_contraseña, foto } = req.body;
  
  // Validar campos vacíos del formulario de delegado
  if (!nombre || !apellido1 || !apellido2 || !dni || !usuario || !contrasena || !repetir_contraseña || !foto) {
    return res.status(400).json({ error: 'Todos los campos del formulario de delegado son obligatorios' });
  }

  // Realizar validaciones adicionales si es necesario
  
  // Ejemplo de inserción en la base de datos
  const sql = 'INSERT INTO delegado (nombre, apellido1, apellido2, dni, nickname, contraseña, fotodelegadourl) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db_connection.query(sql, [nombre, apellido1, apellido2, dni, usuario, contrasena, foto], (error, results) => {
    if (error) {
      console.error('Error al insertar el delegado:', error);
      return res.status(500).json({ error: 'Error al insertar el delegado' });
    }

    // Delegado insertado exitosamente
    return res.status(200).json({ message: 'Delegado insertado correctamente' });
  });
});

router.post('/nuevo_equipo', (req, res) => {
  const { nombre, color_camiseta, color_segunda_camiseta, direccion_campo, escudo } = req.body;

  // Validar campos vacíos del formulario de equipo
  if (!nombre || !color_camiseta || !color_segunda_camiseta || !direccion_campo || !escudo) {
    return res.status(400).json({ error: 'Todos los campos del formulario de equipo son obligatorios' });
  }

  // Realizar validaciones adicionales si es necesario

  // Ejemplo de inserción en la base de datos
  const sql = 'INSERT INTO equipo (nombre, color_camiseta, color_segunda_camiseta, direccion_campo, escudo) VALUES (?, ?, ?, ?, ?)';
  db_connection.query(sql, [nombre, color_camiseta, color_segunda_camiseta, direccion_campo, escudo], (error, results) => {
    if (error) {
      console.error('Error al insertar el equipo:', error);
      return res.status(500).json({ error: 'Error al insertar el equipo' });
    }

    // Equipo insertado exitosamente
    return res.status(200).json({ message: 'Equipo insertado correctamente' });
  });
});

router.post('/nuevo_jugador', (req, res) => {
  const { nombre, apellido1, apellido2, dni, fecha_nacimiento, dorsal, foto } = req.body;
  
  // Validar campos vacíos del formulario de jugador
  if (!nombre || !apellido1 || !apellido2 || !dni || !fecha_nacimiento || !dorsal || !foto) {
    return res.status(400).json({ error: 'Todos los campos del formulario de jugador son obligatorios' });
  }

  // Realizar validaciones adicionales si es necesario
  
  // Ejemplo de inserción en la base de datos
  const sql = 'INSERT INTO jugador (nombre, apellido1, apellido2, dni, fechaNacimiento, dorsal, foto) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db_connection.query(sql, [nombre, apellido1, apellido2, dni, fecha_nacimiento, dorsal, foto], (error, results) => {
    if (error) {
      console.error('Error al insertar el jugador:', error);
      return res.status(500).json({ error: 'Error al insertar el jugador' });
    }

    // Jugador insertado exitosamente
    return res.status(200).json({ message: 'Jugador insertado correctamente' });
  });
});