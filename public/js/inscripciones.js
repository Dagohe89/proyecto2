// Importar los módulos necesarios
const express = require('express');
const mysql = require('mysql');
const multer = require('multer');

// Crear una instancia de Express
const app = express();

// Configurar el almacenamiento de archivos con Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directorio de almacenamiento de las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nombre de archivo único
  }
});
const upload = multer({ storage });

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost', // Cambiar según la configuración de tu base de datos
  user: 'root', // Cambiar según el usuario de tu base de datos
  password: '', // Cambiar según la contraseña de tu base de datos
  database: 'faf' // Cambiar según el nombre de tu base de datos
});

// Establecer la conexión a la base de datos
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos: ' + error.stack);
    return;
  }
  console.log('Conexión establecida con la base de datos.');
});

// Ruta para manejar el envío del formulario
app.post('/formulario', upload.single('foto'), (req, res) => {
  const nombre = req.body.nombre;
  const apellido1 = req.body.apellido1;
  const apellido2 = req.body.apellido2;
  const dni = req.body.dni;
  const foto = req.file.filename;

  // Crear la consulta SQL para insertar los datos en la tabla "Delegado"
  const sql = `INSERT INTO Delegado (Nombre, Apellido1, Apellido2, dni, foto) VALUES (?, ?, ?, ?, ?)`;
  const values = [nombre, apellido1, apellido2, dni, foto];

  // Ejecutar la consulta
  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error('Error al insertar los datos: ' + error.stack);
      res.status(500).send('Error al insertar los datos en la base de datos.');
      return;
    }

    console.log('Datos insertados correctamente.');

    // Enviar una respuesta al cliente
    res.status(200).send('Datos insertados correctamente en la base de datos.');

    // Cerrar la conexión a la base de datos
    connection.end();
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});