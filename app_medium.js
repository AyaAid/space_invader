const grade = document.getElementById("grade");
const game = document.getElementById("game");
let getDown = false;
let direction = 1;
let touch = [];
let size = 16;
let pos_ship = 280;
let ennemyId;
let points = 0;
let shoot;

for(let i = 0; i < 320; i++) {
    let board = document.createElement("div");
    grade.appendChild(board);
}

const board = document.querySelectorAll("#grade div");
let ennemy = []
let temp = 0;
for (let i=0; i<46; i++) {
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
        board[pos].classList.remove(shoot);
        pos -= 16;
        board[pos].classList.add(shoot);
        if(board[pos].classList.contains("ennemy")){
            board[pos].classList.remove(shoot);
            board[pos].classList.remove("ennemy");
            board[pos].classList.add("boom");
            clearInterval(tir);
            setTimeout(() => board[pos].classList.remove("boom"), 400);
            touch.push(ennemy.indexOf(pos));
            points++;
            game.innerHTML = points;
            localStorage.setItem("points", points);
            console.log(points)
        };
        if (pos < 16) {
            clearInterval(tir);
            setTimeout(() => board[pos].classList.remove(shoot), 400);
        }
    }, 100);
    
};

/* Fonction de tir de laser aléatoire par 1 ennemi choisi aléatoirement  seulement si il n'y a aucun autre ennemi devant lui */


function tirEnnemy(){

    var shootEnnemy = new Audio('assets/sound/shootEnnemy.mp3');
    if (active_sound_effects) {
        shootEnnemy.play()
    }
    
    let ennemyShoot = Math.floor(Math.random() * ennemy.length);
    let pos = ennemy[ennemyShoot];
    if (board[pos].classList.contains("ennemy")){
        let tir = setInterval(() => {
            board[pos].classList.remove("tirEnnemy");
            pos += 16;
            board[pos].classList.add("tirEnnemy");
            if(board[pos].classList.contains("ship")){
                board[pos].classList.remove("tirEnnemy");
                board[pos].classList.add("boum");
                clearInterval(tir);
                setTimeout(() => board[pos].classList.remove("boum"), 400);
                location.href="perdre.html";
            };
            if (pos > 304) {
                clearInterval(tir);
                setTimeout(() => board[pos].classList.remove("tirEnnemy"), 400);
            }
        }, 100);
    }
}


/* si la fonction tir ennemy est utiliser alors lance un audio */
var tirEnnemyId = setInterval(tirEnnemy, 1000);

document.addEventListener("keydown", (e) => {
    if(e.keyCode === 32){
        tir();
        event.preventDefault();
        /* son de tir */
        if (active_sound_effects) {
            var audio = new Audio('assets/sound/blaster.mp3');
            audio.volume = 0.2;
            audio.play();
        }
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
        if (active_sound_effects) {
            var death = new Audio('assets/sound/explosion.mp3');
            death.volume = 0.5;
            death.play()
        }
        location.href="perdre.html";
        clearInterval(ennemyId);
    }

    if (board[pos_ship].classList.contains("ennemy")) {
        // son de l'explosion si le vaisseau est touché
        if (active_sound_effects) {
            var death = new Audio('assets/sound/explosion.mp3');
            death.volume = 0.5;
            death.play()
        }
        location.href="perdre.html";
        board[pos_ship].classList.add("boum");
        clearInterval(ennemyId);

    }

    if (touch.length == ennemy.length) {
        location.href="gagner.html";
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

    if(e.keyCode == 37) {
        event.preventDefault(); // Deplacement Gauche et ne pas dépasser la taille de la ligne
        if (pos_ship % size !== 0) {
            pos_ship -= 1;
        }
    }
    else if (e.keyCode == 39) {
        event.preventDefault(); // Deplacement Droite et ne pas dépasser la taille de la ligne
        if (pos_ship % size < size - 1) {
            pos_ship += 1;
        }
    }else if (e.keyCode == 40) {
        event.preventDefault();// deplacement bas si fleche du bas pressé sans dépasser la taille du tableau et sans dépasser la taille de la ligne
        if (pos_ship + size < board.length) {
            pos_ship += size;
            hauteur--;
            
        }
        console.log(hauteur);
    }else if (e.keyCode == 38) {
        event.preventDefault();// deplacement haut si fleche du haut pressé sans dépasser la taille du tableau et sans dépasser la taille de la ligne et met un limite de 3 de hauteur
        if (pos_ship - size >= 0 && hauteur < 2) {
            pos_ship -= size;
            hauteur++;
            
        }
        console.log(hauteur);

    }
    board[pos_ship].classList.add("ship");
}

/* sauvegarde dans un local storage, le niveau de jeu ici moyen */
var niveau = "medium";
localStorage.setItem("niveau", niveau);



let active_sound_effects;

// Activer ou Désactiver le son des bruitages
function muted_sound_effects() {
    if(active_sound_effects) {
        active_sound_effects = false;
    } else {
        active_sound_effects = true;
    };
};

color = localStorage.getItem("color");
console.log(color);

if (color=="blue"){
    shoot = "shoot_blue";
}
else if (color=="red"){
    shoot = "shoot_red";
}
else if (color=="green"){
    shoot = "shoot_green";
}
else if (color=="yellow"){
    shoot = "shoot_yellow";
}
