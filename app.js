const grade = document.getElementById("grade");
const game = document.getElementById("game");
let getDown = false;
let direction = 1;
let touch = [];

for(let i = 0; i < 320; i++) {
    let board = document.createElement("div");
    grade.appendChild(board);
}

const board = document.querySelectorAll("#grade div");
const ennemy = [
    2,3,4,5,6,7,8,9,10,11,12,13,
    18,19,20,21,22,23,24,25,26,27,28,29,
    34,35,36,37,38,39,40,41,42,43,44,45
];

let pos_ship = 280;
let ennemyId;

board[pos_ship].classList.add("ship");

ennemy.forEach(ennemy => {
    board[ennemy].classList.add("ennemy");
});

ennemyId = setInterval(happyDance, 300);

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
        }
    }, 100);
};

document.addEventListener("keydown", (e) => {
    if(e.keyCode === 32){
        tir();
    }
});

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
        alert("Perdu ! test");
        clearInterval(ennemyId);
    }

    if (board[pos_ship].classList.contains("ennemy")) {
        alert("Perdu ! test");
        board[pos_ship].classList.add("boum");
        clearInterval(ennemyId);
    }

    if (touch.length == ennemy.length) {
        alert("Gagné ! test");
        clearInterval(ennemyId);
    }

}