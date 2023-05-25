// view.routes.js
const express = require('express');
const router = express.Router();

// Ruta de competicion
router.get('/competicion', (req, res) => {
  res.render('competicion');
});

// Ruta de contacto
router.get('/contacto', (req, res) => {
    res.render('contacto');
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
