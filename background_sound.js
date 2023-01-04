const knob = document.querySelector(".knob");
const audio = document.querySelector("#audio");
const prog = document.querySelector(".progress > div");
const bar = document.querySelector(".progress");
const play = document.querySelector(".play-btn");
const percent = document.querySelector(".percent");

// Set volume to mute initially
audio.volume = 0.0;

// Previous x,y values
let prevX = 0;
let prevY = 0;
// Final calculation volume
let vol = 0;

// Get thee full bar width
barW = bar.clientWidth;

function volumeKnob(e) {
    // Get half of the knob width & height
    const w = knob.clientWidth / 2;
    const h = knob.clientHeight / 2;

    // Get the mouse coordinates
    const x = e.clientX - knob.offsetLeft;
    const y = e.clientY - knob.offsetTop;

    // Calculating delta values
    const deltaX = w - x;
    const deltaY = h - y;

    // Mouse position in radians
    const rad = Math.atan2(deltaY, deltaX);
    // Convert to degress
    let deg = rad * (180 / Math.PI);

    /*=== Tracking mouse in each quarter ===*/
    
    // Top right corner
    if (y < h && x > w) {
        // Increasing
        if (prevX <= x && prevY <= y) {
            vol++;
        }
        // Decreasing
        else if (prevX >= x && prevY >= y) {
            vol--;
        }
    }
    // Battam right corner
    else if (y > h && x > w) {
        // Increasing
        if (prevX >= x && prevY <= y) {
            vol++;
        }
        // Decreasing
        else if (prevX <= x && prevY >= y) {
            vol--;
        }
    }
    // Top left corner
    else if (y < h && x < w) {
        // Increasing
        if (prevX <= x && prevY >= y) {
            vol++;
        }
        // Decreasing
        else if (prevX >= x && prevY <= y) {
            vol--;
        }
    }
    // Battam left corner
    else if (y > h && x < w) {
        // Increasing
        if (prevX >= x && prevY >= y) {
            vol++;
        }
        // Decreasing
        else if (prevX <= x && prevY <= y) {
            vol--;
        }
    }

    // Get percentage of progress width
    const percentage = Math.round((100 * vol) / barW);
     

    // Restrict progress going below zero
    if (vol < 0) {
        vol = 0;
    // Restrict progress going above 100%
    } else if (vol > barW) {
        vol = barW;
    } else {
        //set progress width
        prog.style.width = vol + "px";
        // Set audio volume
        audio.volume = percentage / 100;
        // Set the percent output
        percent.innerText = percentage + "%";
    }

    // Update values
    prevX = x;
    prevY = y;

    return deg;
}

// Play audio
play.addEventListener("click", () =>{
    audio.play();
    play.style.display = "none";
});

// Rotation
function rotate(e) {
    // FInal calculations for the mouse position
    const result = Math.floor(volumeKnob(e) - 80);
    // Rotate knob with the final calculation
    knob.style.transform = `rotate(${result}deg)`;
}

// Start rotations
function startRotation() {
    window.addEventListener("mousemove", rotate);
    window.addEventListener("mouseup", endRotation);
}

// End rotations
function endRotation() {
    window.removeEventListener("mousemove", rotate);
}

// Add event Listeners
knob.addEventListener("mousedown", startRotation);