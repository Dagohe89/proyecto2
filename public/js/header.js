const loginButton = document.getElementById('BtnLgn');
const xButton = document.getElementsByClassName('close')[0]
const closeButton = document.getElementById('BtnCierra');
const modal = document.getElementById('modal');
let isLoggedIn = false;

document.addEventListener('DOMContentLoaded', function () {
  // Obtener la pestaña actual del enlace
  const currentTab = window.location.pathname;

  // Obtener todos los elementos de la lista de navegación
  const navItems = document.querySelectorAll('.navbar-nav .nav-item');

  // Recorrer los elementos de la lista de navegación
  navItems.forEach((item) => {
    // Obtener el enlace dentro del elemento de la lista
    const link = item.querySelector('a');

    // Obtener el valor del atributo "href" del enlace
    const href = link.getAttribute('href');

    // Verificar la pestaña actual usando un switch
    switch (currentTab) {
      case "/":
      case "/login":
      case "/logout":
        if (href === "/") {
          link.classList.add('active');
        }
        break;
      case "/competicion":
      case "/equipos":
      case "/actualidad":
      case "/galeria":
      case "/inscripciones":
      case "/miequipo":
        if (href === currentTab) {
          link.classList.add('active');
        }
        break;
      default:
        // No se encontró ninguna coincidencia
        break;
    }
  });
});

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

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Obtén los valores de los campos de usuario y contraseña
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Realiza una solicitud AJAX utilizando fetch
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: username, password: password })
  })
    .then(function(response) {
      if (response.ok) {
        // Inicio de sesión exitoso, redirige al usuario a otra página
        window.location.href = '/dashboard';
      } else {
        // Mostrar mensaje de error si falla el inicio de sesión
        alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      }
    })
    .catch(function(error) {
      console.error('Error de red:', error);
    });
});