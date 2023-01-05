let active_sound_effects;
let active_music;

// Activer ou Désactiver le son des bruitages
function muted_sound_effects() {
    if(active_sound_effects) {
        active_sound_effects = false;
    } else {
        active_sound_effects = true;
    };
};

// Activer ou Désactiver le son de la musique
function muted_music() {
    if(active_music) {
        active_music = false;
    } else {
        active_music = true;
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
