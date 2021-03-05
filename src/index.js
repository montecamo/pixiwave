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
  speed: 0.01,
  infinite: true,
  ["wave type"]: "circle",
  ["clear waves"]: () => {
    coreRenderer.clearWaves();
  },
};

const centerPoint = makePoint(0, 0);
const waveFunction = makeWaveFunction(options.frequency, options.amplitude);

const shape = makeBasicShape(
  centerPoint,
  "rectangle",
  Math.round(options.size - 1)
);
const wave = makeBasicWaveShape(
  centerPoint,
  { type: "circle" },
  { type: "infinite", speed: options.speed, func: waveFunction }
);

const coreRenderer = makeRenderer(shape);
coreRenderer.addWave(wave);

const threeRenderer = new ThreeRenderer(document.body);
threeRenderer.init();

const stats = installStats(document.getElementById("stats"));
installControls(options);

window.addEventListener("click", () => {
  const hoveredCoordinates = threeRenderer.getHoveredBoxCoordinates();

  if (hoveredCoordinates) {
    coreRenderer.addWave(
      makeBasicWaveShape(
        makePoint(
          hoveredCoordinates.x - options.size / 2,
          hoveredCoordinates.y - options.size / 2
        ),
        { type: options["wave type"] },
        {
          type: options.infinite ? "infinite" : "pulse",
          speed: options.speed,
          func: waveFunction,
        }
      )
    );
  }
});

function loop() {
  stats.begin();

  coreRenderer.updateShape(
    makeBasicShape(centerPoint, "rectangle", Math.round(options.size - 1))
  );

  coreRenderer.updateWaveFunction(
    makeWaveFunction(options.frequency, options.amplitude)
  );

  coreRenderer.updateWaveSpeed(options.speed);

  coreRenderer.tick();
  threeRenderer.updateBoxes(coreRenderer.render());

  threeRenderer.render();

  stats.end();
  requestAnimationFrame(loop);
}

loop();
