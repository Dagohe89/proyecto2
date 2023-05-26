document.getElementById('myForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar el envío del formulario por defecto

  // Obtener los valores de los campos del formulario
  var nombre = document.getElementById("nombre").value;
  var apellido1 = document.getElementById("apellido1").value;
  var apellido2 = document.getElementById("apellido2").value;
  var dni = document.getElementById("dni").value;
  var foto = document.getElementById("foto").files[0]; // Archivo de foto

  // Insertar los datos en la tabla "delegado" de la base de datos
  connection.query(
    `INSERT INTO Delegado (nombre, apellido1, apellido2, dni, foto) VALUES (?, ?, ?, ?, ?)`,
    [nombre, apellido1, apellido2, dni, foto.name],
    function (error, results, fields) {
      if (error) {
        console.error("Error al guardar los datos:", error);
      } else {
        console.log("Datos guardados correctamente");
        // Aquí puedes realizar alguna acción adicional después de guardar los datos
      }
    }
  );
});