const formDelegado = document.getElementById('myFormDelegado');
const formEquipo = document.getElementById('myFormEquipo');
const formJugador = document.getElementById('myFormJugador');

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

  if (form === formDelegado) {
    const contrasenaInput = document.getElementById('contrasena');
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

    const updateValidationOnInput = () => {
      updateValidation();
      contrasenaInput.removeEventListener('input', updateValidationOnInput);
    };

    confirmarContrasenaInput.addEventListener('input', updateValidation);
    contrasenaInput.addEventListener('input', updateValidationOnInput);
  }

  const formData = new FormData(form);
  const endpoint = form.getAttribute('action');

  fetch(endpoint, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      form.reset();
      form.classList.remove('was-validated');
  
      // Mostrar el modal de éxito
      $('#successModal').modal('show');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

window.addEventListener('beforeunload', () => {
  formDelegado.reset();
  formEquipo.reset();
  formJugador.reset();
});

formDelegado.addEventListener('submit', (event) => {
  event.preventDefault();
  validateAndSubmitForm(formDelegado);
});

formEquipo.addEventListener('submit', (event) => {
  event.preventDefault();
  validateAndSubmitForm(formEquipo);
});

formJugador.addEventListener('submit', (event) => {
  event.preventDefault();
  validateAndSubmitForm(formJugador);
});