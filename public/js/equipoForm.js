
const equipoForm = document.getElementById('myFormEquipo');
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
