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

module.exports = router;
