//+++++ Variables

// Mode de fonctionnement global du circuit
// = 25ème heure de la table horaire

// Mode de chaque tranche horaire en mode programme
let trancheHoraire = 0;
let numeroProgramme = [
  2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2,
]; // 25ème heure = mode global du circuit
let texteProgramme = [
  "Eco",
  "Eco",
  "Eco",
  "Eco",
  "Eco",
  "Eco",
  "Eco",
  "Eco",
  "Conf",
  "Conf",
  "Conf",
  "Conf",
  "Conf",
  "Conf",
  "Conf",
  "Conf",
  "Conf",
  "Conf",
  "Conf",
  "Conf",
  "Conf",
  "Eco",
  "Eco",
  "Eco",
  "Economie",
]; // 25ème heure = mode global du circuit
let couleurProgramme = [
  "#ffff00",
  "#ffff00",
  "#ffff00",
  "#ffff00",
  "#ffff00",
  "#ffff00",
  "#ffff00",
  "#ffff00",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ff0000",
  "#ffff00",
  "#ffff00",
  "#ffff00",
  "#ffff00",
]; // 25ème heure = mode global du circuit

//+++++ FONCTIONS

//Changer le mode principal du circuit
function changeMode() {
  numeroProgramme[24] += 1; //Incrémente le mode
  numeroProgramme[24] %= 5; //Modulo nombre d'états possibles
  switch (numeroProgramme[24]) {
    case 0:
      texteProgramme[24] = "Arret";
      couleurProgramme[24] = "#00ffff";
      break;
    case 1:
      texteProgramme[24] = "Hors Gel";
      couleurProgramme[24] = "#00ff00";
      break;
    case 2:
      texteProgramme[24] = "Economie";
      couleurProgramme[24] = "#ffff00";
      break;
    case 3:
      texteProgramme[24] = "Confort";
      couleurProgramme[24] = "#ff0000";
      break;
    case 4:
      texteProgramme[24] = "Programme".concat(String.fromCharCode(9660));
      couleurProgramme[24] = "#dddddd";
      break;
    default:
      texteProgramme[24] = "Erreur!";
      couleurProgramme[24] = "#000000";
      break;
  }
  animePage(); //Appel la fonction de mise à jour des animations de la page HTML
}

//Changer les modes de la table horaire
function changeProg(trancheHoraire) {
  numeroProgramme[trancheHoraire] += 1; //Incrémente le mode
  numeroProgramme[trancheHoraire] %= 4; //Modulo nombre d'états possibles
  switch (numeroProgramme[trancheHoraire]) {
    case 0:
      texteProgramme[trancheHoraire] = "Arret";
      couleurProgramme[trancheHoraire] = "#00ffff";
      break;
    case 1:
      texteProgramme[trancheHoraire] = "Gel";
      couleurProgramme[trancheHoraire] = "#00ff00";
      break;
    case 2:
      texteProgramme[trancheHoraire] = "Eco";
      couleurProgramme[trancheHoraire] = "#ffff00";
      break;
    case 3:
      texteProgramme[trancheHoraire] = "Conf";
      couleurProgramme[trancheHoraire] = "#ff0000";
      break;
    default:
      texteProgramme[trancheHoraire] = "Err!";
      couleurProgramme[trancheHoraire] = "#000000";
      break;
  }
  animePage(); //Appel la fonction de mise à jour des animations de la page HTML
}

//Mettre à jour les animations de la page HTML
function animePage() {
  //Boutons du mode principal
  {
    const modesPossibles = [
      "Arrêt",
      "Hors-Gel",
      "Economie",
      "Confort",
      "Programme",
    ];
    document.getElementById("texte").innerText =
      modesPossibles[numeroProgramme[24]];
    const couleursPossibles = [
      "#00FFFF",
      "#00FF00",
      "#FFFF00",
      "#FF0000",
      "#DDDDDD",
    ];
    document.getElementById("couleur").style.backgroundColor =
      couleursPossibles[numeroProgramme[24]];
  }
  //Boutons de la table horaire
  for (let n = 0; n < 24; n++) {
    const suffix = n < 10 ? "0".concat(n.toString()) : n.toString();
    const texte = "texteH".concat(suffix);
    const couleur = "couleurH".concat(suffix);

    const modesPossibles = ["Arrêt", "Gel", "Eco", "Conf"];
    document.getElementById(texte).innerText =
      modesPossibles[numeroProgramme[n]];
    const couleursPossibles = ["#00FFFF", "#00FF00", "#FFFF00", "#FF0000"];
    document.getElementById(couleur).style.backgroundColor =
      couleursPossibles[numeroProgramme[n]];
  }
  //Désactive l'affichage de la table horaire si le mode n'est pas Programme (4)
  if (numeroProgramme[24] == 4) {
    document.getElementById("afficheProgramme").style.display = "";
  } else {
    document.getElementById("afficheProgramme").style.display = "none";
  }
}

//Enregistre et retourne à la page d'acceuil
function retourIndex() {
  //Enregistre la configuration
  const requete = new XMLHttpRequest();
  requete.open("POST", "cuisineRec");
  requete.setRequestHeader("Content-Type", "application/octet-stream");
  requete.send(JSON.stringify(numeroProgramme));
  requete.onreadystatechange = function () {
    if (requete.readyState == 4) {
      document.location = "index";
    }
  };
}

//Charge la configuration
function chargeConfig() {
  const requete = new XMLHttpRequest();
  requete.open("GET", "cuisineRead");
  requete.send();
  requete.onreadystatechange = () => {
    if (requete.readyState == 4) {
      numeroProgramme = JSON.parse(requete.response);
      animePage();
    }
  };
}

//Annule et retourne à la page d'accueil
function annule() {
  document.location = "index";
}
