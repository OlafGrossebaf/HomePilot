//+++++ Bibiiothèques
const cp = require("child_process"); // Utliser les commandes système

//+++++ BOUCLE PRINCIPALE

// Initialiser les ports GPIO
cp.execSync("gpio mode 21 out"); // Alternance + circuit cuisine
cp.execSync("gpio mode 22 out"); // Alternance - circuit cuisine
cp.execSync("gpio mode 23 out"); // Alternance + circuit chambre
cp.execSync("gpio mode 24 out"); // Alternance - circuit chambre

// Allumer les sorties GPIO
cp.execSync("gpio write 21 0");
cp.execSync("gpio write 22 0");
cp.execSync("gpio write 23 0");
cp.execSync("gpio write 24 0");
