const grade = document.getElementById("grade");
const game = document.getElementById("game");

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

let size = 16;
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
            setTimeout(() => board[pos].classList.remove("boom"), 700);
        }
    }, 100);
}

document.addEventListener("keydown", (e) => {
    if(e.keyCode === 32){
        tir();
    }
});



document.addEventListener("keydown", moverShip);

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