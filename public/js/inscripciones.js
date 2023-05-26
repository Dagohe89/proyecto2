// Obtener referencias a los formularios
const formDelegado = document.getElementById('myFormDelegado');
const formEquipo = document.getElementById('myFormEquipo');
const formJugador = document.getElementById('myFormJugador');

// Función para aplicar la validación de Bootstrap y verificar campos vacíos
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
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      form.reset();
      form.classList.remove('was-validated'); // Limpiar las clases de validación
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

// Vaciar los campos de entrada al refrescar la página
window.addEventListener('beforeunload', () => {
  formDelegado.reset();
  formEquipo.reset();
  formJugador.reset();
});

// Escuchar el evento de envío del formulario para el Delegado
formDelegado.addEventListener('submit', (event) => {
  event.preventDefault();
  validateAndSubmitForm(formDelegado);
});

// Escuchar el evento de envío del formulario para el Equipo
formEquipo.addEventListener('submit', (event) => {
  event.preventDefault();
  validateAndSubmitForm(formEquipo);
});

// Escuchar el evento de envío del formulario para el Jugador
formJugador.addEventListener('submit', (event) => {
  event.preventDefault();
  validateAndSubmitForm(formJugador);
});