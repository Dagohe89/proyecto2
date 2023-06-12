/*const equipos =  [ { nombre: "A", local: true, ronda: false, duelos: ["A"] },
  { nombre: "B", local: false, ronda: false, duelos: ["B"]},
  { nombre: "C", local: true, ronda: false, duelos: ["C"] },
  { nombre: "D", local: false, ronda: false, duelos: ["D"] },
  { nombre: "E", local: true, ronda: false, duelos: ["E"] },
  { nombre: "F", local: false, ronda: false, duelos: ["F"] },
  { nombre: "G", local: true, ronda: false, duelos: ["G"] },
  { nombre: "H", local: false, ronda: false, duelos: ["H"] },
  { nombre: "I", local: true, ronda: false, duelos: ["I"] },
  { nombre: "J", local: false, ronda: false, duelos: ["J"] },
];

for (let j = 1; j <=9; j++) {
  console.log("Ronda: " + j + " -------");
  let i = 0;
  while (equipos[i].ronda == false) {
    let local = [];
    let visitante = [];
    if (equipos[i].local) {
      local[i] = equipos[i].nombre;
      equipos[i].local = false;
      equipos[i].ronda = true;
    } else {
      visitante[i] = equipos[i].nombre;
      equipos[i].local = true;
      equipos[i].ronda = true;
    }
    console.log(local[i] + "vs" + visitante[i]);
    i++;
  }
}*/

/*for (let j = 1; j <= 9; j++) {
    console.log("Ronda: " + j + " ------");
      let local = equipos[0];
      let visitante = equipos[1];
      for (let i = 0; i < equipos.length; i++) {
        let equipo = equipos[i];
        if (equipo.ronda === false) {
         if (equipo.local === true) {
          local = equipo.num;
          equipo.local = false;
          equipo.ronda = true;
         } else if (equipo.local === false) {
          visitante = equipo.num;
          equipo.local = true;
          equipo.ronda = true;
         }
        }
      console.log(" Equipos: (Local)" + local + " vs " + visitante + "(Visitante)");
    }
  }*/