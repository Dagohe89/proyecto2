// clasificacion.routes.js
const express = require('express');
const router = express.Router();

// Ruta para la página de clasificación
router.get('/', (req, res) => {
  res.render('competicion');
});

module.exports = router;
