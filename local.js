var level = localStorage.getItem("niveau"); // recupere le niveau de la partie jouer précédement

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



