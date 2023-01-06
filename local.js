
var level = localStorage.getItem("niveau"); // recupere le niveau de la partie jouer précédement
var point = localStorage.getItem("points");
var user = document.getElementById("user");
var utilisateur = localStorage.getItem("input");
if(document.getElementById("user")){
    document.getElementById("user").textContent = utilisateur; 
}
if(document.getElementById("points")){
    document.getElementById("points").textContent = point;
}
// en fonction de la derniere partie, renvoie sur une partie du meme niveau avec le bouton rejouer
function rejouer(){
    if(level === "easy"){
        location.href="app_easy.html";
    };
    if(level === "medium"){
        location.href="app_medium.html";
    };
    if(level === "hard"){
        location.href="app_hard.html";
    };
};

let couleur;

document.addEventListener("click",(e)=>{
    couleur = e.target.id;
    var color;
    if (couleur=="choix1"){
        color = "red";
        localStorage.setItem("color",color);
    }
    else if (couleur=="choix2"){
        color = "blue";
        localStorage.setItem("color",color);
    }
    else if (couleur=="choix3"){
        color = "yellow";
        localStorage.setItem("color",color);
    }
    else if (couleur=="choix4"){
        color = "green";
        localStorage.setItem("color",color);
    }
})
