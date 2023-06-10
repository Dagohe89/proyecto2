// Selecciona el carousel por su ID
var carousel = document.getElementById('carouselExampleCaptions');

// Define la velocidad de cambio de las imágenes en milisegundos
var interval = 5000;

// Función para cambiar automáticamente las imágenes
function autoChangeSlide() {
  // Obtiene todas las imágenes dentro del carousel
  var carouselItems = carousel.querySelectorAll('.carousel-item');
  
  // Busca la imagen activa actualmente
  var activeIndex = Array.from(carouselItems).findIndex(item => item.classList.contains('active'));
  
  // Calcula el índice de la próxima imagen
  var nextIndex = (activeIndex + 1) % carouselItems.length;
  
  // Cambia la clase 'active' para la imagen actual y la próxima imagen
  carouselItems[activeIndex].classList.remove('active');
  carouselItems[nextIndex].classList.add('active');
  
  // Espera el tiempo especificado antes de cambiar a la siguiente imagen
  setTimeout(autoChangeSlide, interval);
}

// Inicia el cambio automático de las imágenes
autoChangeSlide();