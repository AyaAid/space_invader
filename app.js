const grade = document.getElementById("grade");
const pontuacao = document.getElementById("pontuacao");

for(let i = 0; i < 240; i++) {
    let quadrado = document.createElement("div");
    grade.appendChild(quadrado);
}

const quadrados = document.querySelectorAll("#grade div");
const invasores = [
    0,1,2,3,4,5,6,7,8,9,10,11,
    15,16,17,18,19,20,21,22,23,24,25,26,
    30,31,32,33,34,35,36,37,38,39,40,41
];

let posicaoJogador = 202;
let invasoresId;

quadrados[posicaoJogador].classList.add("jogador")

invasores.forEach(invasor => {
    quadrados[invasor].classList.add("invasor");
});

document.addEventListener("keydown", moverJogador);
invasoresId = setInterval(moverInvasores, 300);
document.addEventListener("keyup", atirar);