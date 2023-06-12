const fotoForm = document.getElementById('fotoform');

fotoForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const fotoInput = document.getElementById('image');
const tituloInput = document.getElementById('titulo');

const validateRequiredFields = () => {
  let hasEmptyFields = false;

  if (fotoInput.value === '') {
    fotoInput.classList.add('is-invalid');
    hasEmptyFields = true;
  } else {
    fotoInput.classList.remove('is-invalid');
  }

  if (tituloInput.value === '') {
    tituloInput.classList.add('is-invalid');
    hasEmptyFields = true;
  } else {
    tituloInput.classList.remove('is-invalid');
  }

  return hasEmptyFields;
};

if (validateRequiredFields()) {
  alert('Por favor, completa todos los campos del formulario.');
  return;
}

    const formData = new FormData(fotoForm);

    fetch('/subeimagen', {
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
            fotoForm.reset();
            alert("Imagen subida correctamente.")
            // Redirigir a otra página
            window.location.href = 'galeria';
        })
        .catch(error => {
            // Manejar el error en caso de que ocurra
            console.error('Error:', error);
        });
});
