// view.routes.js
const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const router = express.Router();
const db_connection = require('../database/connection.js');

router.get('/competicion', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;

  const sql = 'SELECT * FROM equipo';
  db_connection.query(sql, (error, equipos) => {
    if (error) {
      console.error('Error al obtener los datos de la tabla "equipo":', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    // Realizar cálculos adicionales
    equipos.forEach(equipo => {
      equipo.totalPuntos = equipo.ganados * 3 + equipo.empatados;
      equipo.jugados = equipo.ganados + equipo.empatados + equipo.perdidos;
      equipo.diferenciaGoles = equipo.golesFavor - equipo.golesContra;
    });

    // Ordenar los equipos por puntos y diferencia de goles
    equipos.sort((a, b) => {
      if (b.totalPuntos !== a.totalPuntos) {
        return b.totalPuntos - a.totalPuntos; // Ordenar por puntos de forma descendente
      } else if (b.ganados !== a.ganados) {
        return b.ganados - a.ganados;
      } else if (b.empatados !== a.empatados) {
        return b.empatados - a.empatados;
      } else if (b.diferenciaGoles !== a.diferenciaGoles) {
        return b.diferenciaGoles - a.diferenciaGoles; // Ordenar por diferencia de goles de forma descendente
      }
    });

    const sql2 = 'SELECT nombre, goles, asistencias, ta, tr, fotojugadorurl FROM jugador';
    db_connection.query(sql2, (error, jugadores) => {
      if (error) {
        console.error('Error al obtener los datos de la tabla "jugador":', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }

      // Ordenar por goles de forma descendente
      const jugadoresGoles = [...jugadores].sort((a, b) => b.goles - a.goles);

      // Ordenar por asistencias de forma descendente
      const jugadoresAsistencias = [...jugadores].sort((a, b) => b.asistencias - a.asistencias);

      // Ordenar por tarjetas amarillas de forma descendente
      const jugadoresTa = [...jugadores].sort((a, b) => b.ta - a.ta);

      // Ordenar por tarjetas rojas de forma descendente
      const jugadoresTr = [...jugadores].sort((a, b) => b.tr - a.tr);

      res.render('competicion', { user, equipos, jugadores, jugadoresGoles, jugadoresAsistencias, jugadoresTa, jugadoresTr });
    });
  });
});

//Ruta de equipos
router.get('/equipos', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;
  // Consulta SQL para obtener la información de la tabla existente en tu base de datos
  const sql = 'SELECT * FROM equipo';

  // Ejecutar la consulta SQL
  db_connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener la información de la base de datos:', error);
      return;
    }
    // Renderizar el HTML utilizando el motor de plantillas EJS y pasar los resultados de la consulta como datos
    res.render('equipos', { user, equipos: results });
  });
});

// Ruta de Actualidad
router.get('/actualidad', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;
  res.render('actualidad', { user });
});

// Ruta de Galeria
router.get('/galeria', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;

  const sql = 'SELECT titulo, imagenurl FROM imagen';
  db_connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener los datos de la tabla "imagen":', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.render('galeria', { user, images: results });
  });
});


// Ruta de Inscripciones
router.get('/inscripciones', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;
  if (user) {
    try {
      const sql = 'SELECT * FROM equipo WHERE delegado_iddelegado = ?';
      db_connection.query(sql, [user.id], (error, results) => {
        if (error) {
          console.error('Error al obtener el equipo:', error);
          return res.render('inscripciones', { user, equipo: null });
        }

        const equipo = results.length > 0;

        res.render('inscripciones', { user, equipo });
      });
    } catch (error) {
      console.error('Error al obtener el equipo:', error);
      res.render('inscripciones', { user, equipo: null });
    }
  } else {
    // Si no hay un usuario con sesión iniciada
    res.render('inscripciones', { user: null, equipo: null });
  }
});

//Ruta de miequipo
router.get('/miequipo', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;
  const delegadosql = 'SELECT * FROM delegado WHERE iddelegado = ?';
  db_connection.query(delegadosql, [user.id], (error, delegadoResults) => {
    if (error) {
      console.error('Error al obtener el delegado: ', error);
      return res.render('miequipo', { user: false, delegado: false, equipo: false, jugador: false });
    }
    const equiposql = 'SELECT * FROM equipo WHERE delegado_iddelegado = ?';
    db_connection.query(equiposql, [user.id], (error, equipoResults) => {
      if (error) {
        console.error('Error al obtener el equipo:', error);
        return res.render('miequipo', { user, delegado: delegadoResults[0], equipo: false, jugador: false });
      }
      if (equipoResults.length === 0) {
        // No se encontró ningún equipo asociado
        return res.render('miequipo', { user, delegado: delegadoResults[0], equipo: false, jugador: false });
      }
      const jugadorsql = 'SELECT *,  DATE_FORMAT(fechaNacimiento, "%D-%M-%Y") AS fecha FROM jugador WHERE equipo_idequipo = ?';
      db_connection.query(jugadorsql, [equipoResults[0].idequipo], (error, jugadorResults) => {
        if (error) {
          console.error('Error al obtener los jugadores:', error);
          return res.render('miequipo', { user, delegado: delegadoResults[0], equipo: equipoResults[0], jugador: false, });
        }

        res.render('miequipo', { user, delegado: delegadoResults[0], equipo: equipoResults[0], jugador: jugadorResults });
      });
    });
  });
});


// Ruta de contacto
router.get('/contacto', (req, res) => {
  const user = req.session.userId ? { id: req.session.userId } : null;
  res.render('contacto', { user });
});




module.exports = router;
