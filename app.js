const grade = document.getElementById("grade");
const game = document.getElementById("game");

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
let invasoresId;

board[pos_ship].classList.add("ship");

ennemy.forEach(ennemy => {
    board[ennemy].classList.add("ennemy");
});



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
        }
    }, 100);
}

document.addEventListener("keydown", (e) => {
    if(e.keyCode === 32){
        tir();
    }
});