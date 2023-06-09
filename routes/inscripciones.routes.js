const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const router = express.Router();
const db_connection = require('../database/connection.js');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Número de rondas de hashing (mayor es más seguro pero más lento)

router.post('/nuevo_delegado', (req, res) => {

  const { nombre, apellido1, apellido2, dni, telefono, email, usuario, contrasena } = req.body;
  const fotodelegado = req.files.fotodelegado;

  db_connection.query('SELECT * FROM delegado WHERE dni = ? OR correo = ? OR nickname = ? OR telefono = ?', [dni, email, usuario, telefono], (error, results) => {
    if (error) {
      console.error('Error al verificar la existencia del delegado:', error);
      return res.status(500).json({ error: 'Error al verificar la existencia del delegado' });
    }

    const dniExists = results.some(row => row.dni === dni);
    const emailExists = results.some(row => row.correo === email);
    const usuarioExists = results.some(row => row.nickname === usuario);
    const telefonoExists = results.some(row => row.telefono === telefono);

    if (dniExists || emailExists || usuarioExists || telefonoExists) {
      // Existen duplicados en la base de datos
      return res.status(409).json({
        exists: true,
        dniExists,
        emailExists,
        usuarioExists,
        telefonoExists
      });
    }

    fotodelegado.mv(`uploads/${fotodelegado.name}`, (error) => {
      if (error) {
        console.error('Error en la subida de la imagen:', error);
        return res.status(500).json({
          ok: false,
          message: 'Error en la subida de la imagen. Por favor, inténtelo más tarde. ' + error,
        });
      }

      // Ejemplo de encriptación de la contraseña
      bcrypt.hash(contrasena, saltRounds, (err, hashedPassword) => {
        if (err) {
          console.error('Error al encriptar la contraseña:', err);
          return res.status(500).json({ error: 'Error al encriptar la contraseña' });
        }

        // Ejemplo de inserción en la base de datos con la contraseña encriptada
        const fotodelegadoDBURL = `${fotodelegado.name}`;
        const sql = 'INSERT INTO delegado VALUES (default, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db_connection.query(sql, [nombre, apellido1, apellido2, dni, telefono, email, usuario, hashedPassword, fotodelegadoDBURL], (error, results) => {
          if (error) {
            console.error('Error al insertar el delegado:', error);
            return res.status(500).json({ error: 'Error al insertar el delegado' });
          }
                 // Restablecer los campos del formulario
                // Delegado insertado exitosamente
                /*return*/ return res.status(200).json({ success: true });
        });
      });
    });
  });
});

// Equipo
router.post('/nuevo_equipo', (req, res) => {

  // Obtener los datos del formulario de equipo
  const { nombreEquipo, color_camiseta, color_segunda_camiseta, direccion_campo } = req.body;
  const fotoescudo = req.files.fotoescudo;
  const userId = req.session.userId;
  // Comprobación de existencia del equipo para el delegado actual
  db_connection.query('SELECT * FROM equipo WHERE delegado_iddelegado = ?', [userId], (error, results) => {
    if (error) {
      console.error('Error al consultar la tabla equipo:', error);
      return res.status(500).json({ error: 'Error al consultar la tabla equipo' });
    }
    const iddelegadoExists = results.some(row => row.delegado_iddelegado === userId);
    
    if (iddelegadoExists) {
      // Existen duplicados en la base de datos
      return res.status(409).json({
        exists: true,
        iddelegadoExists
      });
    }

/*
    if (equipoExists) {
      return res.status(400).json({ error: 'Ya existe un equipo registrado para este delegado' });
    }*/

    // Resto de comprobaciones y código de inserción del equipo
    fotoescudo.mv(`uploads/${fotoescudo.name}`, (error) => {
      if (error) {
        return res.status(500).json({
          ok: false,
          message: 'Error en la subida de la imagen. Por favor, inténtelo más tarde. ' + error,
        });
      }

      // Ejemplo de inserción en la base de datos
      const fotoescudoDBURL = `${fotoescudo.name}`;
      const sql = 'INSERT INTO equipo VALUES (default, ?, ?, ?, ?, ?, 0, 0, 0, 0, 0, ?)';
      db_connection.query(sql, [nombreEquipo, color_camiseta, color_segunda_camiseta, direccion_campo, fotoescudoDBURL, userId], (error, results) => {
        if (error) {
          console.error('Error al insertar el equipo:', error);
          return res.status(500).json({ error: 'Error al insertar el equipo' });
        }
        // Equipo insertado exitosamente
        return res.status(200).json({ success: true });
      });
    });
  });
});

//Jugador
router.post('/nuevo_jugador', (req, res) => {
  const { nombre, apellido1, apellido2, dni, fechanacimiento, dorsal } = req.body;
  const fotojugador = req.files.fotojugador;
  const userId = req.session.userId

  // Validar campos vacíos del formulario de jugador
  if (nombre === null || apellido1 === null || apellido2 === null || dni === null || fechanacimiento === null || dorsal === null || fotojugador === null) {
    return res.status(400).json({ error: 'Todos los campos del formulario de jugador son obligatorios' });
  }

  // Validar la fecha de nacimiento del jugador
  const fechaNacimiento = new Date(fechanacimiento);
  const fechaActual = new Date();

  // Comparar las fechas
  if (fechaNacimiento > fechaActual) {
    return res.status(400).json({ error: 'La fecha de nacimiento no puede ser mayor que la fecha actual' });
  }

  // Calcular la diferencia en años
  const edadJugador = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

  // Verificar si el jugador es mayor de 18 años
  if (edadJugador < 18) {
    return res.status(400).json({ error: 'El jugador debe ser mayor de edad' });
  }

  // Consultar el idequipo del delegado actual
  const sqlConsulta = 'SELECT idequipo FROM equipo WHERE delegado_iddelegado = ?';
  db_connection.query(sqlConsulta, [userId], (error, resultsConsulta) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      return res.status(500).json({ error: 'Error al realizar la consulta' });
    }

    const idequipo = resultsConsulta[0].idequipo;

    fotojugador.mv(`uploads/${fotojugador.name}`, error => {
      if (error) {
        return res.status(500).json({
          ok: false,
          message: 'Error en la subida de la imagen. Por favor, inténtelo más tarde. ' + error
        });
      }

      // Ejemplo de inserción en la base de datos
      const fotojugadorDBURL = `${fotojugador.name}`;
      const sql = 'INSERT INTO jugador VALUES (default, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0, 0)';
      db_connection.query(sql, [nombre, apellido1, apellido2, dni, fechanacimiento, dorsal, fotojugadorDBURL, idequipo], (error, results) => {
        if (error) {
          console.error('Error al insertar el jugador:', error);
          return res.status(500).json({ error: 'Error al insertar el jugador' });
        }
        // Jugador insertado exitosamente
        return res.redirect('inscripciones');
      });
    });
  });
});

module.exports = router;