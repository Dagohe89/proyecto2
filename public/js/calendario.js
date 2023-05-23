// Array con los nombres de los sujetos
const sujetos = ['Sujeto 1', 'Sujeto 2', 'Sujeto 3', 'Sujeto 4', 'Sujeto 5', 'Sujeto 6', 'Sujeto 7', 'Sujeto 8', 'Sujeto 9', 'Sujeto 10'];

// Generar las combinaciones de enfrentamientos
const enfrentamientos = [];
for (let i = 0; i < sujetos.length - 1; i++) {
  for (let j = i + 1; j < sujetos.length; j++) {
    enfrentamientos.push([sujetos[i], sujetos[j]]);
  }
}

// Mostrar los enfrentamientos
enfrentamientos.forEach((enfrentamiento, index) => {
  const sujeto1 = enfrentamiento[0];
  const sujeto2 = enfrentamiento[1];
  console.log(`Enfrentamiento ${index + 1}: ${sujeto1} vs ${sujeto2}`);
});