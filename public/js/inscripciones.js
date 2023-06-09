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

const input = document.querySelector("#telefono");
window.intlTelInput(input, {
  preferredCountries: ["es"], // Agrega los códigos de país que deseas mostrar primero
  separateDialCode: true,
  formatOnDisplay: true,
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
});

// Obtener los formularios por su ID
const delegadoForm = document.getElementById('myFormDelegado');
const equipoForm = document.getElementById('myFormEquipo');
const jugadorForm = document.getElementById('myFormJugador');

// Agregar un controlador de eventos para el envío del formulario de delegado
delegadoForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar el envío del formulario

  // Recoger los datos del formulario de delegado
  const nombre = document.getElementById('nombre').value;
  const apellido1 = document.getElementById('apellido1').value;
  const apellido2 = document.getElementById('apellido2').value;
  const dni = document.getElementById('dni').value;
  const telefono = document.getElementById('telefono').value;
  const email = document.getElementById('email').value;
  const usuario = document.getElementById('usuario').value;
  const contrasena = document.getElementById('contrasena').value;
  const confirmarContrasena = document.getElementById('confirmarContrasena').value;
  const fotodelegado = document.getElementById('fotodelegado').value;

  if (
    nombre === '' ||
    apellido1 === '' ||
    apellido2 === '' ||
    dni === '' ||
    telefono === '' ||
    email === '' ||
    usuario === '' ||
    contrasena === '' ||
    confirmarContrasena === '' ||
    fotodelegado === ''
  ) {
    // Mostrar un mensaje de error o realizar alguna acción apropiada
    alert('Por favor, completa todos los campos del formulario.');
    return; // Evitar el envío del formulario
  }
  // Reiniciar el formulario
  delegadoForm.reset();

  // Realizar cualquier otra acción con los datos recogidos del formulario
  // ...

  // Mostrar un mensaje de éxito o redirigir a otra página
  res.render('inscripciones');
});

// Agregar un controlador de eventos para el envío del formulario de equipo
equipoForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar el envío del formulario

  // Recoger los datos del formulario de equipo
  const nombreEquipo = document.getElementById('nombreEquipo').value;
  const colorCamiseta = document.getElementById('color-camiseta').value;
  const colorSegundaCamiseta = document.getElementById('color-segunda-camiseta').value;
  const direccionCampo = document.getElementById('direccion-campo').value;
  const fotoescudo = document.getElementById('fotoescudo').value;


  if (
    nombre === '' ||
    apellido1 === '' ||
    apellido2 === '' ||
    dni === '' ||
    telefono === '' ||
    email === '' ||
    usuario === '' ||
    contrasena === '' ||
    confirmarContrasena === '' ||
    fotodelegado === ''
  ) {
    // Mostrar un mensaje de error o realizar alguna acción apropiada
    alert('Por favor, completa todos los campos del formulario.');
    return; // Evitar el envío del formulario
  }
  // Reiniciar el formulario
  equipoForm.reset();

  // Realizar cualquier otra acción con los datos recogidos del formulario
  // ...

  // Mostrar un mensaje de éxito o redirigir a otra página
  res.render('inscripciones');
});

// Agregar un controlador de eventos para el envío del formulario de jugador
jugadorForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar el envío del formulario

  // Recoger los datos del formulario de jugador
  const nombreJugador = document.getElementById('nombre-jugador').value;
  const apellido1Jugador = document.getElementById('apellido1-jugador').value;
  const apellido2Jugador = document.getElementById('apellido2-jugador').value;
  const dniJugador = document.getElementById('dni-jugador').value;
  const fechaNacimiento = document.getElementById('fechanacimiento').value;
  const dorsalJugador = document.getElementById('dorsal-jugador').value;
  const fotojugador = document.getElementById('fotojugador').value;

  if (
    nombre === '' ||
    apellido1 === '' ||
    apellido2 === '' ||
    dni === '' ||
    telefono === '' ||
    email === '' ||
    usuario === '' ||
    contrasena === '' ||
    confirmarContrasena === '' ||
    fotodelegado === ''
  ) {
    // Mostrar un mensaje de error o realizar alguna acción apropiada
    alert('Por favor, completa todos los campos del formulario.');
    return; // Evitar el envío del formulario
  }
  // Reiniciar el formulario
  jugadorForm.reset();

  // Realizar cualquier otra acción con los datos recogidos del formulario
  // ...

  // Mostrar un mensaje de éxito o redirigir a otra página
  res.render('inscripciones');
});