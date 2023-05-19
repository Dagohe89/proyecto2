
const express = require('express');
const fileUpload = require('express-fileupload');
const db_connection = require('./database/connection.js');
/*
const indexRoutes = require('./routes/index.routes.js');
const blogRoutes = require('./routes/blog.routes.js');
*/
//configurar nuestras propias rutas a nuestros archivos una vez creados
const app = new express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));

app.use(fileUpload());
/*
app.use(indexRoutes, blogRoutes);
app.use((req, res) => {
  res.status(404).render("error404");
});*/
//configurar nuestras rutas con nuestras propias views y public

db_connection.getConnection(err => {
  if (err) throw err;
  console.log("Conexión correcta con la BD");
});

app.listen(port, () => {
  console.log(`Servidor local http://localhost:${port}`);
});