const grade = document.getElementById("grade");
const game = document.getElementById("game");
let getDown = false;
let direction = 1;
let touch = [];
let size = 16;
let pos_ship = 280;
let ennemyId;
let points = 0;

for(let i = 0; i < 320; i++) {
    let board = document.createElement("div");
    grade.appendChild(board);
}

const board = document.querySelectorAll("#grade div");
let ennemy = []
let temp = 0;
for (let i=0; i<78; i++) {
    if (i<=1){
        continue;
    }
    else if (i>=2){
        ennemy.push(i);
        temp++;
        console.log(ennemy);
        if (temp === 12){
            i+=4;
            temp = 0;
            console.log(ennemy);
        }
    }
}

board[pos_ship].classList.add("ship");

ennemy.forEach(ennemy => {
    board[ennemy].classList.add("ennemy");
});

ennemyId = setInterval(happyDance, 300);

 /*  ===================== FONCTION =========================== */

 /* Fonction de tir de laser par le vaisseau */
function tir(){
    
    
    let pos = pos_ship;
    let tir = setInterval(() => {
        board[pos].classList.remove("tir");
        pos -= 16;
        board[pos].classList.add("tir");
        if(board[pos].classList.contains("ennemy")){
            board[pos].classList.remove("tir");
            board[pos].classList.remove("ennemy");
            board[pos].classList.add("boom");
            clearInterval(tir);
            setTimeout(() => board[pos].classList.remove("boom"), 400);
            touch.push(ennemy.indexOf(pos));
            points++;
            game.innerHTML = points;
            
        };
        if (pos < 16) {
            clearInterval(tir);
            setTimeout(() => board[pos].classList.remove("tir"), 400);
        }
    }, 100);
    
};

/* Fonction de tir de laser aléatoire par 1 ennemi choisi aléatoirement  seulement si il n'y a aucun autre ennemi devant lui*/

function tirEnnemy(){
    var shootEnnemy = new Audio('assets/sound/shootEnnemy.mp3');
    shootEnnemy.play()

    let ennemyTir = ennemy[Math.floor(Math.random() * ennemy.length)];
    let tir = setInterval(() => {
        board[ennemyTir].classList.remove("tirEnnemy");
        ennemyTir += 16;
        board[ennemyTir].classList.add("tirEnnemy");
        if(board[ennemyTir].classList.contains("ship")){
            board[ennemyTir].classList.remove("tirEnnemy");
            board[ennemyTir].classList.add("boum");
            clearInterval(tir);
            setTimeout(() => board[ennemyTir].classList.remove("boum"), 400);
            clearInterval(ennemyId);
            clearInterval(tirEnnemyId);

            var death = new Audio('assets/sound/explosion.mp3');
            death.volume = 0.2;
            death.play()
            location.href = "perdre.html";
        };
        if (ennemyTir > board.length - 16) {
            clearInterval(tir);
            setTimeout(() => board[ennemyTir].classList.remove("tirEnnemy"), 400);
        }
    }, 100);
};

/* si la fonction tir ennemy est utiliser alors lance un audio */
var tirEnnemyId = setInterval(tirEnnemy, 1000);

document.addEventListener("keydown", (e) => {
    if(e.keyCode === 32){
        tir();
        /* son de tir */
        var audio = new Audio('assets/sound/blaster.mp3');
        audio.volume = 0.5;
        audio.play();
    };
});

/* fonction de mouvement de la troupe ennemie */
function happyDance() {
    const debut_ligne = ennemy[0] % 16 == 0;
    const fin_ligne = ennemy[ennemy.length - 1] % 16 == 15;

    ennemy.forEach(ennemy => {
        board[ennemy].classList.remove("ennemy");
    });

    if(debut_ligne && direction == -1) {
        direction = 1;
        getDown = true;
    } else if (fin_ligne && direction == 1) {
        direction = -1;
        getDown = true;
    }

    for(let i = 0; i < ennemy.length; i++) {
        ennemy[i] += getDown ? 16 : direction;
    }

    getDown = false;

    ennemy.forEach((ennemy, indice) => {
        if (!touch.includes(indice)) {
            board[ennemy].classList.add("ennemy");
        }
    });

    if (ennemy[ennemy.length -1] > board.length - 16) {
        // son de l'explosion si le vaisseau est touché
        var death = new Audio('assets/sound/explosion.mp3');
        death.volume = 0.5;
        death.play()
        location.href = "perdre.html";
        clearInterval(ennemyId);
    }

    if (board[pos_ship].classList.contains("ennemy")) {
        // son de l'explosion si le vaisseau est touché
        var death = new Audio('assets/sound/explosion.mp3');
        death.volume = 0.5;
        death.play()
        location.href = "perdre.html";
        board[pos_ship].classList.add("boum");
        clearInterval(ennemyId);

    }

    if (touch.length == ennemy.length) {
        location.href = "gagner.html";
        clearInterval(ennemyId);
    }
}

document.addEventListener("keydown", moverShip);
var hauteur = 0;

/* Fonction de déplacement du vaisseau */
function moverShip(e) {

    const debut_ligne = ennemy[0] % 16 == 0;
    const fin_ligne = ennemy[ennemy.length - 1] % 16 == 15;
    
    board[pos_ship].classList.remove("ship");

    if(e.keyCode == 37) { // Deplacement Gauche et ne pas dépasser la taille de la ligne
        if (pos_ship % size !== 0) {
            pos_ship -= 1;
        }
    }
    else if (e.keyCode == 39) { // Deplacement Droite et ne pas dépasser la taille de la ligne
        if (pos_ship % size < size - 1) {
            pos_ship += 1;
        }
    }else if (e.keyCode == 40) {// deplacement bas si fleche du bas pressé sans dépasser la taille du tableau et sans dépasser la taille de la ligne
        if (pos_ship + size < board.length) {
            pos_ship += size;
            hauteur--;
            
        }
        console.log(hauteur);
    }else if (e.keyCode == 38) {// deplacement haut si fleche du haut pressé sans dépasser la taille du tableau et sans dépasser la taille de la ligne et met un limite de 3 de hauteur
        if (pos_ship - size >= 0 && hauteur < 2) {
            pos_ship -= size;
            hauteur++;
            
        }
        console.log(hauteur);

    }
    board[pos_ship].classList.add("ship");
}
var niveau = "hard"
localStorage.setItem("niveau", niveau);

