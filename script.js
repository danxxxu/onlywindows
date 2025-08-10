// window.addEventListener("click", openNew);

// function openNew() {
//     console.log("click")
//     window.open(window.location.href, "mozillaWindow", "popup=true")
// }

// set background color 
// document.body.style.backgroundColor = "Aqua";

window.addEventListener("resize", changeSize);

let w, h, x, y;
let vol, osc;

document.addEventListener('click', initTone, { once: true });

async function initTone() {
  // Start Tone.js context
  await Tone.start();
  console.log('Audio is ready');
  
  // Now you can schedule/play sounds
  vol = new Tone.Volume(-12).toDestination();
  osc = new Tone.Oscillator().connect(vol).start();

  detectPosition();
}

function changeSize() {
    h = window.innerHeight;
    w = window.innerWidth;
    console.log('size: ' + w + ', ' + h)
    vol.volume.value = mapValue(w, 0, screen.width, -20, -1);
    console.log(vol.volume.value);
}

function detectPosition() {
    if (!window.screenLeft) {
        window.screenLeft = window.screenX;
        window.screenTop = window.screenY;
    }

    x = window.screenLeft;
    y = window.screenTop;

    osc.frequency.value = screen.height - y + 20;
    // console.log(osc.frequency.value)

    window.requestAnimationFrame(detectPosition);
}

function mapValue(v, v1, v2, v3, v4) {
    return v3 + (v - v1) * (v4 - v3) / (v2 - v1);
}

