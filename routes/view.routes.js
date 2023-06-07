// view.routes.js
const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const router = express.Router();
const db_connection = require('../database/connection.js');

// Ruta de competicion
router.get('/competicion', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;

  const sql = 'SELECT * FROM equipo';
  db_connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener los datos de la tabla "equipo":', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    // Realizar cálculos adicionales
    results.forEach(equipo => {
      equipo.totalPuntos = equipo.ganados * 3 + equipo.empatados;
      equipo.jugados = equipo.ganados + equipo.empatados + equipo.perdidos;
      equipo.diferenciaGoles = equipo.golesFavor - equipo.golesContra;
    });

    // Ordenar los resultados por puntos y diferencia de goles
    results.sort((a, b) => {
      if (b.totalPuntos !== a.totalPuntos) {
        return b.totalPuntos - a.totalPuntos; // Ordenar por puntos de forma descendente
      } else if (b.ganados !== a.ganados) {
        return b.ganados - a.ganados;
      } else if (b.empatados !== a.empatados) {
        return b.empatados - a.empatados;
      } else if (b.diferenciaGoles !== a.diferenciaGoles) {
        return b.diferenciaGoles - a.diferenciaGoles; // Ordenar por diferencia de goles de forma descendente
      }
    });

    res.render('competicion', { user, equipos: results });
  });
});

//Ruta de equipos
//Ruta de equipos
router.get('/equipos', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;
  // Consulta SQL para obtener la información de la tabla existente en tu base de datos
  const sql = 'SELECT * FROM equipo';

  // Ejecutar la consulta SQL
  db_connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener la información de la base de datos:', error);
      return;
    }

    // Renderizar el HTML utilizando el motor de plantillas EJS y pasar los resultados de la consulta como datos
    res.render('equipos', { user, equipos: results });
  });
});

// Ruta de Actualidad
router.get('/actualidad', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;
  res.render('actualidad', { user });
});

// Ruta de Galeria
router.get('/galeria', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;

  const sql = 'SELECT imagenurl FROM imagen';
  db_connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener los datos de la tabla "imagen":', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.render('galeria', { user, images: results });
  });
});


// Ruta de Inscripciones
router.get('/inscripciones', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;
  if (user) {
    try {
      const sql = 'SELECT * FROM equipo WHERE delegado_iddelegado = ?';
      db_connection.query(sql, [user.id], (error, results) => {
        if (error) {
          console.error('Error al obtener el equipo:', error);
          return res.render('inscripciones', { user, equipo: false });
        }

        const equipo = results.length > 0;

        res.render('inscripciones', { user, equipo });
      });
    } catch (error) {
      console.error('Error al obtener el equipo:', error);
      res.render('inscripciones', { user, equipo: false });
    }
  } else {
    // Si no hay un usuario con sesión iniciada
    res.render('inscripciones', { user: null, equipo: false });
  }
});

//Ruta de miequipo
router.get('/miequipo', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;
  const sql = 'SELECT * FROM equipo WHERE delegado_iddelegado = ?';
  db_connection.query(sql, [user.id], (error, results) => {
    if (error) {
      console.error('Error al obtener el equipo:', error);
      return res.render('inscripciones', { user, equipo: false });
    }
    res.render('miequipo', { user, equipo: results });
  });
});


// Ruta de contacto
router.get('/contacto', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;
  res.render('contacto', { user });
});




module.exports = router;
