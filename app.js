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
    }, 100);
};

document.addEventListener("keydown", (e) => {
    if(e.keyCode === 32){
        tir();
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
        alert("Perdu !");
        clearInterval(ennemyId);
    }

    if (board[pos_ship].classList.contains("ennemy")) {
        alert("Perdu !");
        board[pos_ship].classList.add("boum");
        clearInterval(ennemyId);
    }

    if (touch.length == ennemy.length) {
        alert("Gagné !");
        clearInterval(ennemyId);
    }

}

document.addEventListener("keydown", moverShip);

/* fonction permettant au vaisseau de se deplacer */
function moverShip(e) {
    board[pos_ship].classList.remove("ship");

    if(e.keyCode == 37) { // Deplacement Gauche
        if(pos_ship % size != 0) {
            pos_ship--;
        }
    } else if (e.keyCode == 39) { // Deplacement Droite
        if (pos_ship % size != size -1) {
            pos_ship++;
        }
    }

    board[pos_ship].classList.add("ship");
}