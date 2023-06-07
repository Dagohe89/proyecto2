const loginButton = document.getElementById('BtnLgn');
const xButton = document.getElementsByClassName('close')[0]
const closeButton = document.getElementById('BtnCierra');
const modal = document.getElementById('modal');
let isLoggedIn = false;

loginButton.addEventListener('click', () => {
  if (isLoggedIn) {
    // Llamar a la función de cierre de sesión
    logout();
  } else {
    modal.style.display = 'block';
  }
});

xButton.addEventListener('click', () => {
  modal.style.display = 'none';
});


closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});


function logout() {
  fetch('/logout', {
    method: 'POST',
  })
    .then(response => response.json())
    .then(data => {
      // Actualizar el estado de isLoggedIn
      isLoggedIn = false;
      // Realizar las acciones necesarias en la interfaz de usuario, como cambiar el texto del botón a "Login"
      loginButton.textContent = 'Login';
    })
    .catch(error => {
      console.error('Error al cerrar la sesión:', error);
      // Mostrar un mensaje de error si es necesario
    });
}

//const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
e.preventDefault();
})