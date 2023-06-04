const express = require('express');
const router = express.Router();

// Ruta para la página de inicio
router.get('/', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;
  res.render('index', { user });
});

module.exports = router;