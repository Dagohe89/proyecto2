const delegadoForm = document.getElementById('myFormDelegado');

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
      alert("Ya te has dado de alta y puedes iniciar sesion. Recuerda tu nombre de usuario y contraseña para iniciar sesión.")
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