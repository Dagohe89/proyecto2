const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const router = express.Router();
const db_connection = require('../database/connection.js');

router.post('/subeimagen', (req, res) => {
  const userId = req.session.userId;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No se ha seleccionado ninguna imagen.');
  }

  const image = req.files.image;

  // Guardar la imagen en el directorio de uploads
  image.mv(`./uploads/${image.name}`, (err) => {
    if (err) {
      console.error('Error al guardar la imagen:', err);
      return res.status(500).send('Error interno del servidor al guardar la imagen.');
    }

    // Insertar la información de la imagen en la base de datos
    const sql = 'INSERT INTO imagen VALUES (default, ?, ?, ?)';
    db_connection.query(sql, [req.body.titulo, image.name, userId], (error, result) => {
      if (error) {
        console.error('Error al insertar la imagen en la base de datos:', error);
        return res.status(500).send('Error interno del servidor al insertar la imagen en la base de datos.');
      }

      res.status(200).send('La imagen se ha cargado correctamente.');
    });
  });
});

module.exports = router;