// view.routes.js
const express = require('express');
const router = express.Router();

// Ruta de competicion
router.get('/competicion', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;
  res.render('competicion', { user });
});

// Ruta de contacto
router.get('/contacto', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;
  res.render('contacto', { user });
  });


// Ruta de Inscripciones
router.get('/inscripciones', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;
  res.render('inscripciones', { user });
});


// Ruta de Actualidad
router.get('/actualidad', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;
  res.render('actualidad', { user });
});

module.exports = router;
