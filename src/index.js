import {
  ThreeRenderer,
  installStats,
  BACKGROUND_COLOR,
} from "./three-renderer";

import {
  makePoint,
  makeBasicShape,
  makeBasicWaveShape,
  makeWaveFunction,
} from "./models";
import { installControls } from "./controls";

import { makeRenderer } from "./renderer";
import { darken } from "./utils";

const options = {
  amplitude: 10,
  frequency: 0.1,
  size: 30,
  speed: 0.01,
  infinite: true,
  rainbow: false,
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
    console.warn("coords", hoveredCoordinates, options.size);
    coreRenderer.addWave(
      makeBasicWaveShape(
        makePoint(
          hoveredCoordinates.x - options.size / 2 + 0.5,
          hoveredCoordinates.y - options.size / 2 + 0.5
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
  const points = coreRenderer.render();

  const colors = options.rainbow
    ? coreRenderer.renderColors()
    : points.map(() => undefined);
  const backgroundColor =
    options.rainbow && coreRenderer.getWavesCount() > 0
      ? darken(BACKGROUND_COLOR, coreRenderer.getWavesCount() / 5)
      : BACKGROUND_COLOR;

  threeRenderer.updateBoxes(points);

  threeRenderer.updateColors(colors);
  threeRenderer.updateBackgroundColor(backgroundColor);

  threeRenderer.render();

  stats.end();
  requestAnimationFrame(loop);
}

loop();
