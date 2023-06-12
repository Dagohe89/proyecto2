const express = require('express');
const session = require('express-session');
const router = express.Router();
const db_connection = require('../database/connection.js');

// Función para mezclar un array de forma aleatoria
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Ruta de Galeria
router.get('/', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;
  let activo = 1;
  const sql = 'SELECT titulo, imagenurl FROM imagen';
  db_connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener los datos de la tabla "imagen":', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    const images = results.map((result) => ({ titulo: result.titulo, imagenurl: result.imagenurl }));
    const randomizedImages = shuffleArray(images);
    res.render('index', { user, images, randomizedImages });
  });
});

module.exports = router;