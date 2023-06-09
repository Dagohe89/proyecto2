/*const contrasenaInput = document.getElementById('contrasena');
const confirmarContrasenaInput = document.getElementById('confirmarContrasena');
const checkIcon = confirmarContrasenaInput.nextElementSibling;

const updateValidation = () => {
  if (confirmarContrasenaInput.value !== contrasenaInput.value) {
    confirmarContrasenaInput.classList.add('is-invalid');
    checkIcon.classList.remove('text-success');
    checkIcon.classList.add('text-danger');
  } else {
    confirmarContrasenaInput.classList.remove('is-invalid');
    checkIcon.classList.remove('text-danger');
    checkIcon.classList.add('text-success');
  }
};

const validateAndSubmitForm = (form) => {
  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }

  const inputs = form.querySelectorAll('.form-control');
  let allInputsFilled = true;

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() === '') {
      allInputsFilled = false;
      inputs[i].classList.add('is-invalid');
    } else {
      inputs[i].classList.remove('is-invalid');
    }
  }

  if (!allInputsFilled) {
    return;
  }

  const formData = new FormData(form);
  const endpoint = form.getAttribute('action');

  fetch(endpoint, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then(() => {
      form.reset();
      form.classList.remove('was-validated');

      const inputs = form.querySelectorAll('.form-control');
    inputs.forEach((input) => {
      input.value = '';
    });

      // Mostrar el modal de éxito
      const modal = document.getElementById('successModal');
      modal.classList.add('show');
      modal.style.display = 'block';

      // Cierra el modal al hacer clic en la "x"
      const closeButton = modal.querySelector('.close');
      closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
      });

      // Cierra el modal al hacer clic en el botón de cerrar
      const closeModalButton = modal.querySelector('.btn-secondary');
      closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

document.addEventListener('DOMContentLoaded', () => {
  const inputsWithValidation = [contrasenaInput, confirmarContrasenaInput];

  inputsWithValidation.forEach((input) => {
    input.addEventListener('input', updateValidation);
  });

  const formDelegado = document.getElementById('myFormDelegado');
  formDelegado.addEventListener('submit', (event) => {
    event.preventDefault();
    validateAndSubmitForm(formDelegado);
  });

  const formEquipo = document.getElementById('myFormEquipo');
  formEquipo.addEventListener('submit', (event) => {
    event.preventDefault();
    validateAndSubmitForm(formEquipo);
  });

  const formJugador = document.getElementById('myFormJugador');
  formJugador.addEventListener('submit', (event) => {
    event.preventDefault();
    validateAndSubmitForm(formJugador);
  });
});*/


// Obtener los formularios por su ID
const delegadoForm = document.getElementById('myFormDelegado');
const equipoForm = document.getElementById('myFormEquipo');
const jugadorForm = document.getElementById('myFormJugador');


delegadoForm.addEventListener('submit', function (event) {
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
      delegadoForm.reset();
      alert("ya te has dado de alta y puedes iniciar sesion. Recuerda tu nombre de usuario y contraseña, te servirá para iniciar sesión.")
      // Redirigir a otra página
      window.location.href = 'inscripciones';
    })
    .catch(error => {
      // Manejar el error en caso de que ocurra
      console.error('Error:', error);
    });
});

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
  const dniJugadorInput = document.getElementById('dni-jugador');
  const fechaNacimientoInput = document.getElementById('fechanacimiento');
  const dorsalJugadorInput = document.getElementById('dorsal-jugador');
  const fotojugadorInput = document.getElementById('fotojugador');

  const inputs = [nombreJugadorInput, apellido1JugadorInput, apellido2JugadorInput, dniJugadorInput, fechaNacimientoInput, dorsalJugadorInput, fotojugadorInput];
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

  /*if (!validateAge()) {
    alert('El jugador debe ser mayor de 18 años.');
    return;
  }*/

  // Reiniciar el formulario
  jugadorForm.reset();

  // Realizar cualquier otra acción con los datos recogidos del formulario
  // ...

  // Mostrar un mensaje de éxito o redirigir a otra página
  res.render('inscripciones');
});

const input = document.querySelector("#telefono");
window.intlTelInput(input, {
  preferredCountries: ["es"], // Agrega los códigos de país que deseas mostrar primero
  separateDialCode: true,
  formatOnDisplay: true,
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
});

// Obtener el elemento select
var selectNumero = document.getElementById("dorsal-jugador");

// Generar opciones numéricas del 1 al 99
for (var i = 1; i <= 99; i++) {
  // Crear un nuevo elemento option
  var option = document.createElement("option");
  option.value = i;
  option.text = i;

  // Agregar la opción al select
  selectNumero.appendChild(option);
}