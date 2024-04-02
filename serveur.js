//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//+                 HOME PILOT                        +
//+                                                   +
//+  Pilotage de sorties GPIO                         +
//+  sur Raspberry Pi 3 B+                            +
//+                                                   +
//+  serveur.js                                       +
//+  v01 d'après proto v13                            +
//+  Francois Lambert                                 +
//+  17/03/2024                                       +
//+++++++++++++++++++++++++++++++++++++++++++++++++++++

//+++++ Bibliothèques
const http = require("http"); // Requètes et réponses HTTP
const fs = require("fs"); // Gestion de fichiers
const cp = require("child_process"); // Utiliser les commandes système

//+++++ FONCTIONS

// Fonctionnement du serveur
function monServeur(requete, reponse) {
  const date = new Date();
  let fichier;
  switch (
    requete.url // Suivant le contenu de l'URL de la requête HHTP
  ) {
    case "/index":
      fichier = fs.readFileSync("index.html", "utf-8"); // Charge le fichier
      reponse.writeHead(200, { "Content-Type": "text/html" }); // Indique le type de la réponse
      reponse.write(fichier); // Charge le fichier dans la réponse
      reponse.end(); // Cloture la réponse
      break;

    case "/index.js":
      fichier = fs.readFileSync("index.js", "utf-8");
      reponse.writeHead(200, { "Content-Type": "text/javascript" });
      reponse.write(fichier);
      reponse.end();
      break;

    case "/styles.css":
      fichier = fs.readFileSync("styles.css", "utf-8");
      reponse.writeHead(200, { "Content-Type": "text/css" });
      reponse.write(fichier);
      reponse.end();
      break;

    case "/cuisine":
      fichier = fs.readFileSync("cuisine.html", "utf-8");
      reponse.writeHead(200, { "Content-Type": "text/html" });
      reponse.write(fichier);
      reponse.end();
      break;

    case "/cuisine.js":
      fichier = fs.readFileSync("cuisine.js", "utf-8");
      reponse.writeHead(200, { "Content-Type": "text/javascript" });
      reponse.write(fichier);
      reponse.end();
      break;

    case "/cuisineRec": // Enregistre les données reçues
      requete.on("data", (donnees) => {
        let donneesString = donnees.toString();
        fs.writeFileSync("cuisine.json", donneesString);
        cuisineGPIO(donneesString);
      });
      reponse.writeHead(200, { "Content-Type": "text/plain" });
      reponse.write("Enregistré");
      reponse.end();
      break;

    case "/cuisineRead": // Transmet les données enregistrées
      fichier = fs.readFileSync("cuisine.json");
      reponse.writeHead(200, { "Content-Type": "text/javascript" });
      reponse.write(fichier);
      reponse.end();
      break;

    case "/chambre":
      fichier = fs.readFileSync("chambre.html", "utf-8");
      reponse.writeHead(200, { "Content-Type": "text/html" });
      reponse.write(fichier);
      reponse.end();
      break;

    case "/chambre.js":
      fichier = fs.readFileSync("chambre.js", "utf-8");
      reponse.writeHead(200, { "Content-Type": "text/javascript" });
      reponse.write(fichier);
      reponse.end();
      break;

    case "/chambreRec":
      // Enregistre les données reçues
      requete.on("data", (donnees) => {
        let donneesString = donnees.toString();
        fs.writeFileSync("chambre.json", donneesString);
        chambreGPIO(donneesString);
      });
      reponse.writeHead(200, { "Content-Type": "text/plain" });
      reponse.write("Enregistré");
      reponse.end();
      break;

    case "/chambreRead":
      // Transmet les données enregistrées
      fichier = fs.readFileSync("chambre.json");
      reponse.writeHead(200, { "Content-Type": "text/javascript" });
      reponse.write(fichier);
      reponse.end();
      break;

    default: // Par défaut, brancher sur la page d'accueil
      fichier = fs.readFileSync("index.html", "utf-8");
      reponse.writeHead(200, { "Content-Type": "text/html" });
      reponse.write(fichier);
      reponse.end();
      break;
  }
}

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

// Initialiser les ports GPIO
cp.execSync("gpio mode 21 out"); // Alternance + circuit cuisine
cp.execSync("gpio mode 22 out"); // Alternance - circuit cuisine
cp.execSync("gpio mode 23 out"); // Alternance + circuit chambre
cp.execSync("gpio mode 24 out"); // Alternance - circuit chambre

// Mise à jour ports GPIO cuisine
let fichierCuisine = fs.readFileSync("cuisine.json");
let tableCuisine = fichierCuisine.toString();
cuisineGPIO(tableCuisine);

// Mise à jour ports GPIO chambre
let fichierChambre = fs.readFileSync("chambre.json");
let tableChambre = fichierChambre.toString();
chambreGPIO(tableChambre);

// Instanciation de l'objet http
const serveur = http.createServer(monServeur);

// Ecoute sur le port 3000
serveur.listen(3000);
