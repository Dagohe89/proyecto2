const loginButton = document.getElementById('BtnLgn');
const modal = document.getElementById('modal');
const closeButton = document.getElementsByClassName('close')[0];

loginButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});