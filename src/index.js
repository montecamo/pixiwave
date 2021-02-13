import { ThreeRenderer, installStats } from "./three-renderer";

import {
  makePoint,
  makeBasicShape,
  makeBasicWaveShape,
  makeWaveFunction,
} from "./abstractShapes";
import { installControls } from "./controls";

import { makeRenderer } from "./renderer";

const options = {
  amplitude: 10,
  frequency: 0.1,
  size: 30,
};

const centerPoint = makePoint(0, 0);
const waveFunction = makeWaveFunction(options.frequency, options.amplitude);

const shape = makeBasicShape(
  centerPoint,
  "rectangle",
  Math.round(options.size)
);
const wave = makeBasicWaveShape(
  centerPoint,
  { type: "circle" },
  { type: "infinite", func: waveFunction }
);

const coreRenderer = makeRenderer(shape);
coreRenderer.addWave(wave);

const threeRenderer = new ThreeRenderer(document.body);
threeRenderer.init();

const stats = installStats(document.getElementById("stats"));
installControls(options);

let last = 0;
function loop(date) {
  stats.begin();

  coreRenderer.updateShape(
    makeBasicShape(centerPoint, "rectangle", Math.round(options.size))
  );

  coreRenderer.updateWaveFunction(
    makeWaveFunction(options.frequency, options.amplitude)
  );

  if (date - last > 30) {
    coreRenderer.tick();
    threeRenderer.updateBoxes(coreRenderer.render());

    last = date;
  }

  threeRenderer.render();

  stats.end();
  requestAnimationFrame(loop);
}

loop();
