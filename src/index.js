import { ThreeRenderer, installStats } from "./three-renderer";

import {
  makePoint,
  getPointX,
  getPointY,
  getPointZ,
  makeBasicShape,
  makeBasicWaveShape,
  makeWaveFunction,
} from "./abstractShapes";
import Stats from "stats.js";

import { makeRenderer } from "./renderer";

const SIZE = 40;

const centerPoint = makePoint(SIZE / 2, SIZE / 2);
const waveFunction = makeWaveFunction(0.1, 20);

const shape = makeBasicShape(centerPoint, "rectangle", SIZE);
const wave = makeBasicWaveShape(
  centerPoint,
  { type: "circle" },
  { type: "infinite", func: waveFunction }
);
const wave2 = makeBasicWaveShape(
  makePoint(50, -50),
  { type: "rectangle" },
  { type: "pulse", func: waveFunction }
);
const wave3 = makeBasicWaveShape(
  makePoint(-50, 50),
  { type: "rectangle" },
  { type: "pulse", func: waveFunction }
);
const wave4 = makeBasicWaveShape(
  makePoint(50, 50),
  { type: "circle" },
  { type: "pulse", func: waveFunction }
);

const coreRenderer = makeRenderer(shape);
coreRenderer.addWave(wave);
//coreRenderer.addWave(wave2);
//coreRenderer.addWave(wave3);
//coreRenderer.addWave(wave4);

const threeRenderer = new ThreeRenderer(document.body);
threeRenderer.init(SIZE);
threeRenderer.addBoxes(coreRenderer.getPoints());

const stats = installStats(document.getElementById("stats"));

function loop() {
  stats.begin();

  coreRenderer.tick();
  threeRenderer.updateBoxes(coreRenderer.getPoints());
  threeRenderer.render();

  stats.end();

  requestAnimationFrame(loop);
}

loop();
