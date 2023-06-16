const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const db_connection = require('../database/connection.js');
const router = express.Router();

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

router.get('/login', (req, res) => {
  // Verificar si hay un usuario con sesión iniciada
  if (req.session.userId) {
    return res.status(200).json({ isLoggedIn: true });
  }

  return res.status(200).json({ isLoggedIn: false });
});

// Ruta de inicio de sesión
router.post('/login', (req, res) => {
  const { nickname, password } = req.body;
  let results;
  const sql = 'SELECT titulo, imagenurl FROM imagen';
  db_connection.query(sql, (error, imagen) => {
    if (error) {
      console.error('Error al obtener los datos de la tabla "imagen":', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    // Consulta SQL para buscar el usuario en la base de datos
    const sql2 = `SELECT * FROM delegado WHERE nickname = ?`;
    db_connection.query(sql2, [nickname], (error, results) => {
      if (error) {
        console.error('Error al buscar el usuario en la base de datos:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      // Verificar si se encontró el usuario en la base de datos
      if (results.length === 0) {
        return res.status(401).json({ error: 'Usuario incorrecto' });
      }

      const user = results[0];

      // Verificar si la contraseña es válida
      if (!bcrypt.compareSync(password, user.contrasena)) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }

      // Autenticación exitosa, establecer la sesión
      req.session.userId = user.iddelegado;
      const images = imagen.map((result) => ({ titulo: result.titulo, imagenurl: result.imagenurl }));
      const randomizedImages = shuffleArray(images);

      res.render('index', { user, images, randomizedImages });
    });
  });
});

  /*router.get('/logout', (req, res) => {
    // Verificar si hay un usuario con sesión iniciada
    if (req.session.userId) {
      return res.status(200).json({ isLoggedIn: false });
    }
  
    return res.status(200).json({ isLoggedIn: true });
  });*/

  router.post('/logout', (req, res) => {
    const sql = 'SELECT titulo, imagenurl FROM imagen';
    db_connection.query(sql, (error, imagen) => {
      if (error) {
        console.error('Error al obtener los datos de la tabla "imagen":', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      req.session.destroy((error) => {
        if (error) {
          console.error('Error al cerrar la sesión:', error);
          return res.status(500).json({ error: 'Error al cerrar la sesión' });
        }

        // Obtén los datos necesarios antes de renderizar la vista
        // Reemplaza 'obtenerResultados' con tu lógica para obtener los datos

        // Verificar si 'user' está definido y proporcionar un valor predeterminado si no lo está
        const user = false;
        const images = imagen.map((result) => ({ titulo: result.titulo, imagenurl: result.imagenurl }));
        const randomizedImages = shuffleArray(images);
        const equipo = false;

        res.clearCookie('connect.sid');
        res.render('index', { user, images, randomizedImages, equipo });
      });
    });
  });

  // Middleware para verificar la sesión
  const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Acceso no autorizado' });
    }
    // El usuario está autenticado, continúa con la siguiente ruta o controlador
    next();
  };

  // Ruta protegida que requiere autenticación
  router.get('/protected', requireAuth, (req, res) => {
    res.status(200).json({ message: 'Acceso autorizado a la ruta protegida' });
  });

  module.exports = router;