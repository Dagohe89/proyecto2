const express = require('express');
const db_connection = require('./database/connection.js');
const fileUpload = require('express-fileupload');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));
app.use(fileUpload());

// Rutas
const indexRoutes = require('./routes/index.routes');
const viewRoutes = require('./routes/view.routes');
const inscripcionesRoutes = require('./routes/inscripciones.routes');

app.use(indexRoutes);
app.use(viewRoutes);
app.use(inscripcionesRoutes);

db_connection.getConnection(err => {
  if (err) throw err;
  console.log("Conexión correcta con la BD");
});

app.listen(port, () => {
  console.log(`Servidor local http://localhost:${port}`);
});