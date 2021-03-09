import { ThreeRenderer, installStats } from './three-renderer';

import {
  makePoint,
  makeBasicShape,
  makeBasicWaveShape,
  makeWaveFunction,
} from './models';
import { installControls } from './controls';

import { makeRenderer } from './renderer';
import { darken, memoize, fswitch, fdefault, randomColor } from './utils';

const darkenMemoized = memoize(darken, (color, amount) => `${color}${amount}`);

const stats = installStats(document.getElementById('stats'));
const controls = installControls();

controls.on('clear', () => {
  coreRenderer.clearWaves();
});

const centerPoint = makePoint(0, 0);

function makeFunction() {
  return makeWaveFunction(controls.get('frequency'), controls.get('amplitude'));
}
function makeShape() {
  return makeBasicShape(
    centerPoint,
    'rectangle',
    Math.round(controls.get<number>('size') - 1)
  );
}

function makeWave(point) {
  return makeBasicWaveShape(
    point,
    { type: controls.get('wavetype') },
    {
      type: controls.get('infinite') ? 'infinite' : 'pulse',
      speed: controls.get('speed'),
      func: makeFunction(),
    }
  );
}

const wave = makeBasicWaveShape(
  centerPoint,
  { type: controls.get('wavetype') },
  {
    type: 'infinite',
    speed: controls.get('speed'),
    func: makeFunction(),
  }
);

const coreRenderer = makeRenderer(makeShape());
coreRenderer.addWave(wave);

const threeRenderer = new ThreeRenderer(document.body);
threeRenderer.init();

threeRenderer.onClick((coordinates) => {
  if (coordinates) {
    coreRenderer.addWave(
      makeWave(
        makePoint(
          coordinates.x - controls.get<number>('size') / 2 + 0.5,
          coordinates.y - controls.get<number>('size') / 2 + 0.5
        )
      )
    );
  }
});

function loop() {
  stats.begin();

  coreRenderer.updateShape(makeShape());
  coreRenderer.updateWaveFunction(makeFunction());
  coreRenderer.updateWaveSpeed(controls.get('speed'));

  coreRenderer.tick();

  const points = coreRenderer.render();

  const colors = fswitch(
    [() => controls.get<boolean>('epilepsy'), points.map(() => randomColor())],
    [() => controls.get<boolean>('rainbow'), points.map(([, color]) => color)],
    [fdefault, points.map(() => undefined)]
  );

  const backgroundColor = fswitch(
    [() => controls.get<boolean>('epilepsy'), randomColor()],
    [
      () => controls.get('rainbow') && coreRenderer.getWavesCount() > 0,
      darkenMemoized(
        threeRenderer.getBackgroundColor(),
        coreRenderer.getWavesCount() / 5
      ),
    ],
    [fdefault, threeRenderer.getBackgroundColor()]
  );

  threeRenderer.updateBoxes(points.map(([point]) => point));
  threeRenderer.updateColors(colors);
  threeRenderer.updateBackgroundColor(backgroundColor);

  threeRenderer.render();

  stats.end();
  requestAnimationFrame(loop);
}

loop();
