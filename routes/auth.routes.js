const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const db_connection = require('../database/connection.js');

const router = express.Router();

// Ruta de inicio de sesión
router.post('/login', (req, res) => {
  const { nickname, password } = req.body;

  // Consulta SQL para buscar el usuario en la base de datos
  const sql = `SELECT * FROM delegado WHERE nickname = ?`;
  db_connection.query(sql, [nickname], (error, results) => {
    if (error) {
      console.error('Error al buscar el usuario en la base de datos:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    // Verificar si se encontró el usuario en la base de datos
    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = results[0];

    // Verificar si la contraseña es válida
    if (!bcrypt.compareSync(password, user.contrasena)) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Autenticación exitosa, establecer la sesión
    req.session.userId = user.iddelegado;

    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  });
});

// Ruta de cierre de sesión
router.post('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error('Error al cerrar la sesión:', error);
      return res.status(500).json({ error: 'Error al cerrar la sesión' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
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