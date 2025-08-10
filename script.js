window.addEventListener("resize", changeSize);

let height = screen.height;
let width = screen.width;
let w, h, x, y;
let vol, osc, panner;
let min_fre = 40;
let max_fre = 5000;
let base_fre = (max_fre - min_fre)**(1/height);
let min_vol = -40;
let max_vol = -1;
// let base_vol = (max_vol - min_vol)**(1/(width*height));

document.addEventListener('click', initTone, { once: true });

async function initTone() {
  // Start Tone.js context
  await Tone.start();
  console.log('Audio is ready');
  let ini_fre = base_fre ** (height - window.screenTop);

  osc = new Tone.Oscillator(ini_fre + min_fre).start();
  
  // Now you can schedule/play sounds
  vol = new Tone.Volume().toDestination();
  changeSize();
  let ini_pan = mapValue(window.screenLeft, 0, width, -1, 1);
  panner = new Tone.Panner(ini_pan).toDestination();
  detectPosition();
  osc.connect(panner).connect(vol);
}

function changeSize() {
    h = window.innerHeight;
    w = window.innerWidth;
    // console.log('size: ' + w + ', ' + h);
    let v = mapValue(h*w, 0, width*height, -70, 5);
    vol.volume.rampTo(v, 0.05);
    console.log(v);
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
    let fre = base_fre ** (height - y);
    // console.log(fre);

    if (fre > 0) {
        osc.frequency.rampTo(fre + min_fre, 0.05);
    }

    let p = mapValue(x, 0, width, -1, 1);
    // console.log(p);
    if (p <= 1 && p >=-1) {
        panner.pan.rampTo(p, 0.1);
    }

    window.requestAnimationFrame(detectPosition);
}

function mapValue(v, v1, v2, v3, v4) {
    return v3 + (v - v1) * (v4 - v3) / (v2 - v1);
}

