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
    .then((data) => {
      console.log(data);
      form.reset();
      form.classList.remove('was-validated');

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
});

const input = document.querySelector("#telefono");
window.intlTelInput(input, {
  preferredCountries: ["es"], // Agrega los códigos de país que deseas mostrar primero
  separateDialCode: true,
  formatOnDisplay: true,
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
});