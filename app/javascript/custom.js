let names = [],
  colors = [],
  sliceDeg,
  speed = 0,
  slowDownRand = 0,
  ctx,
  width,
  center,
  deg,
  isStopped = false,
  lock = false,
  winner,
  winnerCount = 1,
  namesContainer = document.getElementById("names");

// Mélange aléatoire des noms
let shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

// Vérifie et met à jour la zone de texte
let checkTextArea = () => {
  names = namesContainer.value
    .replace(/\n/g, ",") // convertir les sauts de ligne en virgules
    .replace(/,\s*$/, "") // supprimer la dernière virgule
    .split(",")
    .map(function (item) {
      return item.trim();
    });
  document.getElementById("counter").innerText = names.length + " noms";
  sliceDeg = 360 / names.length;
};

// Remplit les couleurs des tranches
let fillColors = () => {
  let color;
  while (colors.length < names.length) {
    do {
      color = Math.floor(Math.random() * 16777215);
    } while (colors.indexOf(color) >= 0);
    colors.push("#" + ("000000" + color.toString(16)).slice(-6));
  }
};

// Génère un nombre aléatoire entre min et max
let rand = (min, max) => {
  return Math.random() * (max - min) + min;
};
deg = rand(0, 360);

// Convertit les degrés en radians
let deg2rad = (deg) => {
  return (deg * Math.PI) / 180;
};

// Dessine une tranche de la roue
let drawSlice = (deg, color) => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(center, center);
  ctx.arc(center, center, width / 2, deg2rad(deg), deg2rad(deg + sliceDeg));
  ctx.lineTo(center, center);
  ctx.fill();
};

// Dessine le texte sur la tranche
let drawText = (deg, text) => {
  ctx.save();
  ctx.translate(center, center);
  ctx.rotate(deg2rad(deg));
  ctx.textAlign = "right";
  ctx.fillStyle = "#fff";
  ctx.font = "bold 20px 'Open Sans', sans-serif";
  ctx.fillText(text, center - 20, center / (names.length * 2));
  ctx.restore();
};

// Dessine l'image de la roue
let drawImg = () => {
  width = (names.length + 2) * 30 > 300 ? (names.length + 2) * 30 : 300;
  let canvas = document.createElement("canvas");
  document.getElementById("wheel").innerHTML = "";
  document.getElementById("wheel").appendChild(canvas);
  ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = width;
  center = width / 2;
  fillColors();
  ctx.clearRect(0, 0, width, width);
  for (let i = 0; i < names.length; i++) {
    drawSlice(deg, colors[i]);
    drawText(deg + sliceDeg / 2, names[i]);
    deg += sliceDeg;
  }
};

// Fonction de spin de la roue
let spinWheel = () => {
  deg += speed;
  deg %= 360;

  // Augmente la vitesse
  if (!isStopped && speed < 5) {
    speed = speed + 1 * 0.1;
  }
  // Diminue la vitesse
  if (isStopped) {
    if (!lock) {
      lock = true;
      slowDownRand = rand(0.1, 0.4);
    }
    speed = speed > 0.1 ? (speed *= slowDownRand) : 0;
  }
  // Si arrêté
  if (lock && !speed) {
    let ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg);
    ai = (names.length + ai) % names.length; // Corrige les indices négatifs
    winner = ai;

    const winnerName = names[winner];
    window.showProjectModal(winnerName); // Affiche la modale
    addWinnerToPassageOrder(winnerName); // Ajoute le gagnant à la liste des "Ordres de passage"

    return;
  }
  drawImg();
  window.requestAnimationFrame(spinWheel);
};

// Fonction pour ajouter le gagnant à la liste des ordres de passage

let addWinnerToPassageOrder = (winnerName) => {
  const passageDiv = document.getElementById("passageOrder");
  const newEntry = document.createElement("p");
  newEntry.classList.add("py-4", "text-start", "ml-2", "text-normal");
  newEntry.textContent = `${winnerCount} - ${winnerName}`; // Ajoute le numéro du gagnant
  passageDiv.appendChild(newEntry);
  winnerCount++; // Incrémente le compteur après chaque tirage
};

// Réinitialise la roue
let reset = () => {
  shuffle(names);
  sliceDeg = 360 / names.length;
  drawImg();
};

// Ajoute l'écouteur d'événements au bouton "spin"
document.getElementById("spin").addEventListener(
  "mousedown",
  () => {
    spinWheel();
    setTimeout(function () {
      isStopped = true;
    }, 1900);

    setTimeout(function () {
      speed = 0;
      slowDownRand = 0;
      isStopped = false;
      lock = false;
    }, 3000);
  },
  false
);

// Met à jour les noms lorsque la zone de texte change
namesContainer.addEventListener(
  "input",
  () => {
    checkTextArea();
    reset();
  },
  false
);

// Ajoute l'écouteur d'événements au bouton "remove"
document.getElementById("remove").addEventListener(
  "mousedown",
  () => {
    names.splice(winner, 1);
    reset();
  },
  false
);

// Initialisation
checkTextArea();
drawImg();
