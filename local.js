var level = localStorage.getItem("niveau");

document.getElementById("rejouer").onclick = function () {
    if(level === "easy"){
        location.href = "app_easy.html";
    } 
};



