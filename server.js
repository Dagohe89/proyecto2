const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const db_connection = require('./database/connection.js');

const app = new express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

// Configuración de express-session
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Rutas
const indexRoutes = require('./routes/index.routes.js');
const viewRoutes = require('./routes/view.routes.js');
const inscripcionesRoutes = require('./routes/inscripciones.routes.js');
const authRoutes = require('./routes/auth.routes.js');

app.use(indexRoutes, viewRoutes, inscripcionesRoutes, authRoutes);

db_connection.getConnection(err => {
  if (err) throw err;
  console.log("Conexión correcta con la BD");
});

app.listen(port, () => {
  console.log(`Servidor local http://localhost:${port}`);
});

module.exports = db_connection;