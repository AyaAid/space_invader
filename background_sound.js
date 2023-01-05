const knob = document.querySelector(".knob");
const audio = document.querySelector("#audio");
const prog = document.querySelector(".progress > div");
const bar = document.querySelector(".progress");
const percent = document.querySelector(".percent");

// Réglez le volume initialement sur muet
audio.volume = 0.25;

// Valeurs x,y précédentes
let prevX = 0;
let prevY = 0;
// Volume du calcul final
let vol = 0;

// Obtenir une largeur de barre complète
barW = bar.clientWidth;

function volumeKnob(e) {
    // Obtenir la moitié de la largeur et de la hauteur du bouton
    const w = knob.clientWidth / 2;
    const h = knob.clientHeight / 2;

    // Obtenir les coordonnées de la souris
    const x = e.clientX - knob.offsetLeft;
    const y = e.clientY - knob.offsetTop;

    // Calcul des valeurs delta
    const deltaX = w - x;
    const deltaY = h - y;

    // Position de la souris en radians
    const rad = Math.atan2(deltaY, deltaX);
    // Convert to degress
    let deg = rad * (180 / Math.PI);

    /*=== Suivi de la souris dans chaque quartier ===*/
    
    // Le coin supérieur droit
    if (y < h && x > w) {
        // En augmentant
        if (prevX <= x && prevY <= y) {
            vol++;
        }
        // Diminution
        else if (prevX >= x && prevY >= y) {
            vol--;
        }
    }
    // Le coin inférieur droit
    else if (y > h && x > w) {
        // En augmentant
        if (prevX >= x && prevY <= y) {
            vol++;
        }
        // Diminution
        else if (prevX <= x && prevY >= y) {
            vol--;
        }
    }
    // Coin supérieur gauche
    else if (y < h && x < w) {
        // En augmentant
        if (prevX <= x && prevY >= y) {
            vol++;
        }
        // Diminution
        else if (prevX >= x && prevY <= y) {
            vol--;
        }
    }
    // Le coin inférieur gauche
    else if (y > h && x < w) {
        // En augmentant
        if (prevX >= x && prevY >= y) {
            vol++;
        }
        // Diminution
        else if (prevX <= x && prevY <= y) {
            vol--;
        }
    }

    // Obtenir le pourcentage de largeur de progression
    const percentage = Math.round((100 * vol) / barW);
     

    // Restreindre la progression en dessous de zéro
    if (vol < 0) {
        vol = 0;
    // Restreindre la progression au-dessus de 100 %
    } else if (vol > barW) {
        vol = barW;
    } else {
        // définir la largeur de progression
        prog.style.width = vol + "px";
        // Régler le volume audio
        audio.volume = percentage / 100;
        // Définir le pourcentage de sortie
        percent.innerText = percentage + "%";
    }

    // Mettre à jour les valeurs
    prevX = x;
    prevY = y;

    return deg;
}

// Lecture audio
audio.play();

// Rotation
function rotate(e) {
    // Calculs finaux pour la position de la souris
    const result = Math.floor(volumeKnob(e) - 80);
    // Tourner le bouton avec le calcul final
    knob.style.transform = `rotate(${result}deg)`;
}

// Commencer les rotations
function startRotation() {
    window.addEventListener("mousemove", rotate);
    window.addEventListener("mouseup", endRotation);
}

// Fin des rotations
function endRotation() {
    window.removeEventListener("mousemove", rotate);
}

// Add event Listeners
knob.addEventListener("mousedown", startRotation);



let active_music;

// Activer ou Désactiver le son de la musique
function muted_music() {
    if(active_music) {
        active_music = false;
    } else {
        active_music = true;
    };
};