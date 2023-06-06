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

    res.render('competicion', { user, equipos: results }); // Enviar user, equipos y vista como JSON
  });
});

//Ruta de equipos
router.get('/equipos', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;
  res.render('equipos', { user });
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
router.get('/inscripciones', async (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;
  if (user) {
    try {
      const equipo = await equipo.findOne({
        where: {
          delegado_iddelegado: user.userId
        }
      });

      if (equipo) {
        // Si hay un equipo asociado al usuario
        res.render('inscripciones', { user, equipo });
      } else {
        // Si no hay un equipo asociado al usuario
        res.render('inscripciones', { user, equipo: null });
      }
    } catch (error) {
      console.error('Error al obtener el equipo:', error);
      res.render('inscripciones', { user, equipo: null });
    }
  } else {
    // Si no hay un usuario con sesión iniciada
    res.render('inscripciones', { user: null, equipo: null });
  }
});

// Ruta de contacto
router.get('/contacto', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;
  res.render('contacto', { user });
});

//Ruta de equipos
router.get('/equipos', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;
  res.render('equipos', { user });
});

//Ruta de miequipo
router.get('/miequipo', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;
  res.render('miequipo', { user });
});





module.exports = router;
