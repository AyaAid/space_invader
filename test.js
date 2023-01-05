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