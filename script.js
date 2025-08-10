window.addEventListener("resize", changeSize);

let height = screen.height;
let width = screen.width;
let w, h, x, y;
let vol, osc, panner;
let min_fre = 40;
let max_fre = 5000;
let base = (max_fre - min_fre)**(1/height);

document.addEventListener('click', initTone, { once: true });

async function initTone() {
  // Start Tone.js context
  await Tone.start();
  console.log('Audio is ready');
  let ini_fre = base ** (height - window.screenTop);

  osc = new Tone.Oscillator(ini_fre + min_fre).start();
  
  // Now you can schedule/play sounds
  vol = new Tone.Volume().toDestination();
  changeSize();
  panner = new Tone.Panner(1).toDestination();
  detectPosition();
  osc.connect(panner).connect(vol);
}

function changeSize() {
    h = window.innerHeight;
    w = window.innerWidth;
    // console.log('size: ' + w + ', ' + h);
    let v = mapValue(h*w, 0, width*height, -40, -1);
    vol.volume.rampTo(v, 0.05);
    // console.log(vol.volume.value);
}

function detectPosition() {
    // fuck things up
    // if (!window.screenLeft) {
    //     window.screenLeft = window.screenX;
    //     window.screenTop = window.screenY;
    // }

    x = window.screenLeft;
    y = window.screenTop;

    // let fre = mapValue(height-y, 0, height, min_fre, max_fre);
    let fre = base ** (height - y);
    console.log(fre);

    if (fre > 0) {
        osc.frequency.rampTo(fre + min_fre, 0.05);
    }

    let p = mapValue(x, 0, width, -1, 1);
    console.log(p);
    panner.pan.rampTo(p, 0.1);

    window.requestAnimationFrame(detectPosition);
}

function mapValue(v, v1, v2, v3, v4) {
    return v3 + (v - v1) * (v4 - v3) / (v2 - v1);
}

