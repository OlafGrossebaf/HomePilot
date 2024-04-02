//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//+                 HOME PILOT                        +
//+                                                   +
//+  Pilotage de sorties GPIO                         +
//+  sur Raspberry Pi 3 B+                            +
//+                                                   +
//+  regen.js                                         +
//+  extrait de serveur.js                            +
//+  v14                                              +
//+  Francois Lambert                                 +
//+  17/03/2024                                       +
//+++++++++++++++++++++++++++++++++++++++++++++++++++++

//+++++ Bibliothèques
const fs = require("fs"); // Gestion de fichiers
const cp = require("child_process"); // Utiliser les commandes système

//+++++ FONCTIONS

// Activation des sorties GPIO chauffage cuisine
function cuisineGPIO(table) {
  const date = new Date();
  const heure = date.getHours();
  let mode;
  if (table[49] === "4") {
    // Mode Programme
    let i = 2 * heure + 1; // Calcul de la position du caractère
    mode = table[i];
  } else {
    mode = table[49];
  }
  switch (mode) {
    case "0": // Mode Arret
      cp.execSync("gpio write 21 0"); // Alternance +
      cp.execSync("gpio write 22 1"); // Alternance -
      break;
    case "1": // Mode Hors Gel
      cp.execSync("gpio write 21 1"); // Alternance +
      cp.execSync("gpio write 22 0"); // Alternance -
      break;
    case "2": // Mode Eco
      cp.execSync("gpio write 21 0"); // Alternance +
      cp.execSync("gpio write 22 0"); // Alternance -
      break;
    case "3": // Mode Confort
      cp.execSync("gpio write 21 1"); // Alternance +
      cp.execSync("gpio write 22 1"); // Alternance -
      break;
    default: // Mode Confort
      cp.execSync("gpio write 21 1"); // Alternance +
      cp.execSync("gpio write 22 1"); // Alternance -
      break;
  }
}

// Activation des sorties GPIO chauffage chambre
function chambreGPIO(table) {
  const date = new Date();
  const heure = date.getHours();
  let mode;
  if (table[49] === "4") {
    // Mode Programme
    let i = 2 * heure + 1; // Calcul de la position du caractère
    mode = table[i];
  } else {
    mode = table[49];
  }
  switch (mode) {
    case "0": // Mode Arret
      cp.execSync("gpio write 23 0"); // Alternance +
      cp.execSync("gpio write 24 1"); // Alternance -
      break;
    case "1": // Mode Hors Gel
      cp.execSync("gpio write 23 1"); // Alternance +
      cp.execSync("gpio write 24 0"); // Alternance -
      break;
    case "2": // Mode Eco
      cp.execSync("gpio write 23 0"); // Alternance +
      cp.execSync("gpio write 24 0"); // Alternance -
      break;
    case "3": // Mode Confort
      cp.execSync("gpio write 23 1"); // Alternance +
      cp.execSync("gpio write 24 1"); // Alternance -
      break;
    default: // Mode Confort
      cp.execSync("gpio write 23 1"); // Alternance +
      cp.execSync("gpio write 24 1"); // Alternance -
      break;
  }
}

//+++++ BOUCLE PRINCIPALE

// Mise à jour ports GPIO cuisine
let fichierCuisine = fs.readFileSync("cuisine.json");
let tableCuisine = fichierCuisine.toString();
cuisineGPIO(tableCuisine);

// Mise à jour ports GPIO chambre
let fichierChambre = fs.readFileSync("chambre.json");
let tableChambre = fichierChambre.toString();
chambreGPIO(tableChambre);
