// view.routes.js
const express = require('express');
const router = express.Router();

// Ruta para la página de competicion
router.get('/competicion', (req, res) => {
  res.render('competicion');
});

// Ruta de contacto
router.get('/contacto', (req, res) => {
    res.render('contacto');
  });

// Ruta Sobre Nosotros
router.get('/organizacion', (req, res) => {
    res.render('organizacion');
  });

// Ruta de Inscripciones
router.get('/inscripciones', (req, res) => {
    res.render('inscripciones');
});

// Ruta de Actualidad
router.get('/actualidad', (req, res) => {
    res.render('actualidad');
});

module.exports = router;
