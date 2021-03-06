import { ThreeRenderer, installStats } from "./three-renderer";

import {
  makePoint,
  makeBasicShape,
  makeBasicWaveShape,
  makeWaveFunction,
} from "./models";
import { installControls } from "./controls";

import { makeRenderer } from "./renderer";
import { darken } from "./utils";

const stats = installStats(document.getElementById("stats"));
const controls = installControls();

controls.on("clear waves", () => {
  coreRenderer.clearWaves();
});

const centerPoint = makePoint(0, 0);

function makeFunction() {
  return makeWaveFunction(controls.get("frequency"), controls.get("amplitude"));
}
function makeShape() {
  return makeBasicShape(
    centerPoint,
    "rectangle",
    Math.round(controls.get<number>("size") - 1)
  );
}

function makeWave(point) {
  return makeBasicWaveShape(
    point,
    { type: controls.get("wave type") },
    {
      type: controls.get("infinite") ? "infinite" : "pulse",
      speed: controls.get("speed"),
      func: makeFunction(),
    }
  );
}

const wave = makeWave(centerPoint);

const coreRenderer = makeRenderer(makeShape());
coreRenderer.addWave(wave);

const threeRenderer = new ThreeRenderer(document.body);
threeRenderer.init();

window.addEventListener("click", () => {
  const hoveredCoordinates = threeRenderer.getHoveredBoxCoordinates();

  if (hoveredCoordinates) {
    coreRenderer.addWave(
      makeWave(
        makePoint(
          hoveredCoordinates.x - controls.get<number>("size") / 2 + 0.5,
          hoveredCoordinates.y - controls.get<number>("size") / 2 + 0.5
        )
      )
    );
  }
});

function loop() {
  stats.begin();

  coreRenderer.updateShape(makeShape());
  coreRenderer.updateWaveFunction(makeFunction());
  coreRenderer.updateWaveSpeed(controls.get("speed"));

  coreRenderer.tick();

  const points = coreRenderer.render();

  const colors = controls.get("rainbow")
    ? coreRenderer.renderColors()
    : points.map(() => undefined);
  const backgroundColor =
    controls.get("rainbow") && coreRenderer.getWavesCount() > 0
      ? darken(
          threeRenderer.getBackgroundColor(),
          coreRenderer.getWavesCount() / 5
        )
      : threeRenderer.getBackgroundColor();

  threeRenderer.updateBoxes(points);
  threeRenderer.updateColors(colors);
  threeRenderer.updateBackgroundColor(backgroundColor);

  threeRenderer.render();

  stats.end();
  requestAnimationFrame(loop);
}

loop();