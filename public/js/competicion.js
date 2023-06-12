// Realiza la consulta SQL para obtener los nombres y los goles de la tabla 'jugador'
/*const query = 'SELECT nombre, goles FROM jugador';

// Ejecuta la consulta
db_connection.query(query, function (error, results, fields) {
  if (error) {
    console.error('Error al realizar la consulta:', error);
    return;
  }

  // Procesa los resultados y genera las filas de la tabla
  var tablaBody = document.getElementById('tabla-body');

  for (var i = 0; i < results.length; i++) {
    var row = document.createElement('tr');

    // Crea las celdas de la fila y asigna los valores correspondientes
    var posCell = document.createElement('td');
    posCell.textContent = i + 1;

    var nombreCell = document.createElement('td');
    nombreCell.textContent = results[i].nombre;

    var gCell = document.createElement('td');
    gCell.textContent = results[i].goles;

    // Agrega las celdas a la fila
    row.appendChild(posCell);
    row.appendChild(nombreCell);
    row.appendChild(gCell);

    // Agrega la fila al tbody de la tabla
    tablaBody.appendChild(row);
  }

  // Cierra la conexión a la base de datos

});*/