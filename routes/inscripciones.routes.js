const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const db_connection = require('../database/connection.js');

router.post('/nuevo_delegado', (req, res) => {
  const { nombre, apellido1, apellido2, dni, usuario, contrasena, repetir_contrasena } = req.body;
  const fotodelegado = req.files.fotodelegado;


  // Validar campos vacíos del formulario de delegado
  if (nombre === null || apellido1 === null || apellido2 === null || dni === null || usuario === null || contrasena === null || repetir_contrasena === null || fotodelegado === null) {
    return res.status(400).json({ error: 'Todos los campos del formulario de delegado son obligatorios' });
  }

  fotodelegado.mv(`uploads/${fotodelegado.name}`, error => {
    if (error) {
      return res.status(500).json({
        ok: false,
        message: 'Error en la subida de la imagen. Por favor, inténtelo más tarde. ' + error
      });
    }

    // Ejemplo de inserción en la base de datos
    const fotodelegadoDBURL = `${fotodelegado.name}`;
    const sql = 'INSERT INTO delegado VALUES (default, ?, ?, ?, ?, ?, ?, ?)';
    db_connection.query(sql, [nombre, apellido1, apellido2, dni, usuario, contrasena, fotodelegadoDBURL], (error, results) => {
      if (error) {
        console.error('Error al insertar el delegado:', error);
        return res.status(500).json({ error: 'Error al insertar el delegado' });
      }

      // Delegado insertado exitosamente
      return res.status(200).json({ message: 'Delegado insertado correctamente' });
    });
  });
});

router.post('/nuevo_equipo', (req, res) => {
  const { nombre, color_camiseta, color_segunda_camiseta, direccion_campo } = req.body;
  const fotoescudo = req.files.fotoescudo;

  // Validar campos vacíos del formulario de equipo
  if (nombre === null || color_camiseta === null || color_segunda_camiseta === null || direccion_campo === null || fotoescudo === null) {
    return res.status(400).json({ error: 'Todos los campos del formulario de equipo son obligatorios' });
  }

  fotoescudo.mv(`uploads/${fotoescudo.name}`, error => {
    if (error) {
      return res.status(500).json({
        ok: false,
        message: 'Error en la subida de la imagen. Por favor, inténtelo más tarde. ' + error
      });
    }

    // Ejemplo de inserción en la base de datos
    const fotoescudoDBURL = `${fotoescudo.name}`;
    const sql = 'INSERT INTO equipo VALUES (default, ?, ?, ?, ?, ?, default, default, default, default, default, 3)';
    db_connection.query(sql, [nombre, color_camiseta, color_segunda_camiseta, direccion_campo, fotoescudoDBURL], (error, results) => {
      if (error) {
        console.error('Error al insertar el equipo:', error);
        return res.status(500).json({ error: 'Error al insertar el equipo' });
      }

      // Equipo insertado exitosamente
      return res.status(200).json({ message: 'Equipo insertado correctamente' });
    });
  });
});

router.post('/nuevo_jugador', (req, res) => {
  const { nombre, apellido1, apellido2, dni, fecha_nacimiento, dorsal } = req.body;
  const fotojugador = req.files.fotojugador;

  // Validar campos vacíos del formulario de jugador
  if (nombre === null || apellido1 === null || apellido2 === null || dni === null || fecha_nacimiento === null || dorsal === null || fotojugador === null) {
    return res.status(400).json({ error: 'Todos los campos del formulario de jugador son obligatorios' });
  }

  fotojugador.mv(`uploads/${fotojugador.name}`, error => {
    if (error) {
      return res.status(500).json({
        ok: false,
        message: 'Error en la subida de la imagen. Por favor, inténtelo más tarde. ' + error
      });
    }

    // Ejemplo de inserción en la base de datos
    const fotojugadorDBURL = `${fotojugador.name}`;
    const sql = 'INSERT INTO jugador (nombre, apellido1, apellido2, dni, fechaNacimiento, dorsal, fotojugadorurl) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db_connection.query(sql, [nombre, apellido1, apellido2, dni, fecha_nacimiento, dorsal, fotojugadorDBURL], (error, results) => {
      if (error) {
        console.error('Error al insertar el jugador:', error);
        return res.status(500).json({ error: 'Error al insertar el jugador' });
      }

      // Jugador insertado exitosamente
      return res.status(200).json({ message: 'Jugador insertado correctamente' });
    });
  });
});


module.exports = router;