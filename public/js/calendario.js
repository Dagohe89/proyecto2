/*const equipos =  [ { num: 0, local: true, ronda: false },
  { num: 1, local: false, ronda: false },
  { num: 2, local: true, ronda: false },
  { num: 3, local: false, ronda: false },
  { num: 4, local: true, ronda: false },
  { num: 5, local: false, ronda: false },
  { num: 6, local: true, ronda: false },
  { num: 7, local: false, ronda: false },
  { num: 8, local: true, ronda: false },
  { num: 9, local: false, ronda: false },
];

for (let j = 1; j <= 9; j++) {
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