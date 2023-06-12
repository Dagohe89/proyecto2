const jugadorForm = document.getElementById('myFormJugador');
// Agregar un controlador de eventos para el envío del formulario de jugador
jugadorForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Evitar el envío del formulario

  // Recoger los datos del formulario de jugador
  const nombreJugadorInput = document.getElementById('nombre-jugador');
  const apellido1JugadorInput = document.getElementById('apellido1-jugador');
  const apellido2JugadorInput = document.getElementById('apellido2-jugador');
  const dniInput = document.getElementById('dnijugador');
  const fechaNacimientoInput = document.getElementById('fechanacimiento');
  const dorsalInput = document.getElementById('dorsal');
  const fotojugadorInput = document.getElementById('fotojugador');

  const inputs = [nombreJugadorInput, apellido1JugadorInput, apellido2JugadorInput, dniInput, fechaNacimientoInput, dorsalInput, fotojugadorInput];
  inputs.forEach(input => {
    input.classList.remove('is-invalid');
  });

  const validateRequiredFields = () => {
    let hasEmptyFields = false;
    inputs.forEach(input => {
      if (input.value === '') {
        input.classList.add('is-invalid');
        hasEmptyFields = true;
      }
    });
    return hasEmptyFields;
  };

  const validateAge = () => {
    const fechaNacimiento = new Date(fechaNacimientoInput.value);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

    if (edad < 18) {
      fechaNacimientoInput.classList.add('is-invalid');
      return false;
    }

    return true;
  };

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.value === '') {
        input.classList.add('is-invalid');
      } else {
        input.classList.remove('is-invalid');
      }
    });
  });

  if (!validateAge()) {
    alert('El jugador debe ser mayor de 18 años.');
    return;
  }

  if (validateRequiredFields()) {
    alert('Por favor, completa todos los campos del formulario.');
    return;
  }

  const formData = new FormData(jugadorForm);

  fetch('/nuevo_jugador', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        // Error al verificar la existencia del equipo
        console.error('Error:', data.error);
        return;
      }

      if (data.exists) {
        // Existen duplicados en la base de datos
        if (data.dnijugadorExists) {
          return alert('Ya hay jugador inscrito con este DNI');
        } else if (data.dorsalExists) {
          return alert('Ya hay un jugador inscrito con este dorsal');
        }
      }

      // Restablecer los campos del formulario
      jugadorForm.reset();
      alert("Jugador registrado correctamente.")
      // Redirigir a otra página
      window.location.href = 'inscripciones';
    })
    .catch(error => {
      // Manejar el error en caso de que ocurra
      console.error('Error:', error);
    });
});


// Obtener el elemento select
var selectNumero = document.getElementById("dorsal");

// Generar opciones numéricas del 1 al 99
for (var i = 1; i <= 99; i++) {
  // Crear un nuevo elemento option
  var option = document.createElement("option");
  option.value = i;
  option.text = i;

  // Agregar la opción al select
  selectNumero.appendChild(option);
}