var level = localStorage.getItem("niveau");

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



