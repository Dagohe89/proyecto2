const express = require('express');
const session = require('express-session');
const router = express.Router();
const db_connection = require('../database/connection.js');


// Ruta de Galeria
router.get('/', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;

  const sql = 'SELECT imagenurl FROM imagen';
  db_connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener los datos de la tabla "imagen":', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.render('index', { user, images: results });
  });
});

module.exports = router;