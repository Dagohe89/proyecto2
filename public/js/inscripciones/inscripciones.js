// Obtener los formularios por su ID
const delegadoForm = document.getElementById('myFormDelegado');
const equipoForm = document.getElementById('myFormEquipo');
const jugadorForm = document.getElementById('myFormJugador');


/*delegadoForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Evitar el envío del formulario

  const nombreInput = document.getElementById('nombre');
  const apellido1Input = document.getElementById('apellido1');
  const apellido2Input = document.getElementById('apellido2');
  const dniInput = document.getElementById('dni');
  const telefonoInput = document.getElementById('telefono');
  const emailInput = document.getElementById('email');
  const usuarioInput = document.getElementById('usuario');
  const contrasenaInput = document.getElementById('contrasena');
  const confirmarContrasenaInput = document.getElementById('confirmarContrasena');
  const fotodelegadoInput = document.getElementById('fotodelegado');

  const inputs = [nombreInput, apellido1Input, apellido2Input, dniInput, telefonoInput, emailInput, usuarioInput, contrasenaInput, confirmarContrasenaInput, fotodelegadoInput];
  inputs.forEach(input => {
    input.classList.remove('is-invalid');
  });


  // Validar campos vacíos
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

  const validatePasswordMatch = () => {
    const confirmarContrasena = confirmarContrasenaInput.value;
    const contrasena = contrasenaInput.value;
    const checkIcon = confirmarContrasenaInput.nextElementSibling;

    if (confirmarContrasena !== contrasena) {
      confirmarContrasenaInput.classList.add('is-invalid');
      contrasenaInput.classList.add('is-invalid');
      checkIcon.classList.remove('text-success');
      checkIcon.classList.add('text-danger');
    } else {
      confirmarContrasenaInput.classList.remove('is-invalid');
      contrasenaInput.classList.remove('is-invalid');
      checkIcon.classList.remove('text-danger');
      checkIcon.classList.add('text-success');
    }
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

  // Validar contraseñas coincidentes al escribir
  contrasenaInput.addEventListener('input', validatePasswordMatch);
  confirmarContrasenaInput.addEventListener('input', validatePasswordMatch);


  if (validateRequiredFields()) {
    alert('Por favor, completa todos los campos del formulario.');
    return;
  }

  validatePasswordMatch();

  if (confirmarContrasenaInput.classList.contains('is-invalid')) {
    return;
  }

  const formData = new FormData(delegadoForm);

  // Realizar la solicitud HTTP utilizando Fetch y el método POST
  fetch('/nuevo_delegado', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        // Error al verificar la existencia del delegado
        console.error('Error:', data.error);
        return;
      }

      if (data.exists) {
        // Existen duplicados en la base de datos
        if (data.dniExists) {
          return alert('El DNI ya está registrado');
        } else if (data.emailExists) {
          return alert('El correo electrónico ya está registrado');
        } else if (data.usuarioExists) {
          return alert('El nombre de usuario ya está registrado');
        } else if (data.telefonoExists) {
          return alert('El teléfono ya está registrado');
        }
      }
      // Restablecer los campos del formulario
      alert("Ya te has dado de alta y puedes iniciar sesion. Recuerda tu nombre de usuario y contraseña para iniciar sesión.")
      // Redirigir a otra página
      window.location.href = 'inscripciones';
    })
    .catch(error => {
      // Manejar el error en caso de que ocurra
      console.error('Error:', error);
    });
});*/

// Agregar un controlador de eventos para el envío del formulario de equipo
equipoForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Evitar el envío del formulario

  // Recoger los datos del formulario de equipo
  const nombreEquipoInput = document.getElementById('nombreEquipo');
  const colorCamisetaInput = document.getElementById('color-camiseta');
  const colorSegundaCamisetaInput = document.getElementById('color-segunda-camiseta');
  const direccionCampoInput = document.getElementById('direccion-campo');
  const fotoescudoInput = document.getElementById('fotoescudo');

  const inputs = [nombreEquipoInput, colorCamisetaInput, colorSegundaCamisetaInput, direccionCampoInput, fotoescudoInput];
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

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.value === '') {
        input.classList.add('is-invalid');
      } else {
        input.classList.remove('is-invalid');
      }
    });
  });

  if (validateRequiredFields()) {
    alert('Por favor, completa todos los campos del formulario.');
    return;
  }

  const formData = new FormData(equipoForm);

  fetch('/nuevo_equipo', {
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
        if (data.iddelegadoExists) {
          return alert('Ya hay un equipo registrado para este delegado');
        }
      }

      // Restablecer los campos del formulario
      equipoForm.reset();
      alert("Equipo registrado correctamente, ahora podras gestionar tus jugadores.")
      // Redirigir a otra página
      window.location.href = 'inscripciones';
    })
    .catch(error => {
      // Manejar el error en caso de que ocurra
      console.error('Error:', error);
    });
});

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

const input = document.querySelector("#telefono");
window.intlTelInput(input, {
  preferredCountries: ["es"], // Agrega los códigos de país que deseas mostrar primero
  separateDialCode: true,
  formatOnDisplay: true,
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
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