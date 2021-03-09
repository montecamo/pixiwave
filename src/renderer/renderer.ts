import type {
  WaveShape,
  WaveFunction,
  WaveSpeed,
  Shape,
  Point,
} from '../models';
import {
  getWaveShapePointDepth,
  increaseWaveShape,
  getShapePoints,
  makePoint,
  getPointX,
  getPointY,
  interfereWaves,
  updateWaveShapeFunction,
  updateWaveShapeSpeed,
  getWaveShapeColor,
} from '../models';
import type { Color } from '../utils';
import { brighten, mixColors, memoize } from '../utils';
import { isWaveFinished } from './utils';

type RenderWaves = Array<WaveShape>;
type RenderShape = Shape;
type RenderState = {
  waves: RenderWaves;
  shape: RenderShape;
};

const brightenMemoized = memoize(
  brighten,
  (color, amount) => `${color}${amount}`
);
const mixColorsMemoized = memoize(mixColors, (colors) => colors.join(''));

type Renderer = {
  addWave(wave: WaveShape): void;
  clearWaves(): void;
  updateWaveFunction(f: WaveFunction): void;
  updateWaveSpeed(speed: WaveSpeed): void;
  updateShape(shape: Shape): void;
  render(colorful: boolean): Array<[Point, Color]>;
  tick(): void;
  getWavesCount(): number;
};

export function makeRenderState(
  waves: RenderWaves,
  shape: RenderShape
): RenderState {
  return { waves, shape };
}

function makeInitialRenderState(shape: Shape): RenderState {
  return makeRenderState([], shape);
}

export function getRenderStateWaves(state: RenderState): RenderWaves {
  return state.waves;
}
export function getRenderStateShape(state: RenderState): RenderShape {
  return state.shape;
}

export function makeRenderer(shape: Shape): Renderer {
  let state = makeInitialRenderState(shape);

  // MUTATORS
  function updateShape(shape) {
    state = makeRenderState(getRenderStateWaves(state), shape);
  }

  function addWave(wave) {
    const waves = getRenderStateWaves(state);

    state = makeRenderState(waves.concat(wave), getRenderStateShape(state));
  }

  function clearWaves() {
    state = makeRenderState([], getRenderStateShape(state));
  }

  function updateWaveFunction(f) {
    state = makeRenderState(
      getRenderStateWaves(state).map((wave) =>
        updateWaveShapeFunction(wave, f)
      ),
      getRenderStateShape(state)
    );
  }

  function updateWaveSpeed(speed) {
    state = makeRenderState(
      getRenderStateWaves(state).map((wave) =>
        updateWaveShapeSpeed(wave, speed)
      ),
      getRenderStateShape(state)
    );
  }

  function tick() {
    const waves = getRenderStateWaves(state);
    const shape = getRenderStateShape(state);

    state = makeRenderState(
      waves.map(increaseWaveShape).filter((w) => !isWaveFinished(shape, w)),
      shape
    );
  }

  // GETTERS
  function render(colorful: boolean): Array<[Point, Color]> {
    const shape = getRenderStateShape(state);
    const waves = getRenderStateWaves(state);
    const shapePoints = getShapePoints(shape);

    return shapePoints.map((p) => {
      const depths = waves.map((wave) => getWaveShapePointDepth(wave, p));
      const height = interfereWaves(depths.filter((d) => d >= 0));

      const point = makePoint(getPointX(p), getPointY(p), height);

      if (colorful) {
        const colors = depths.reduce((acc, depth, index) => {
          if (depth > 0) {
            acc.push(getWaveShapeColor(waves[index]));
          }

          return acc;
        }, []);
        const color = colors.length
          ? brightenMemoized(mixColorsMemoized(colors), height / 10)
          : undefined;

        return [point, color];
      }

      return [point, undefined];
    });
  }

  function getWavesCount(): number {
    return getRenderStateWaves(state).length;
  }

  return {
    addWave,
    updateShape,
    updateWaveFunction,
    updateWaveSpeed,
    clearWaves,
    tick,
    render,
    getWavesCount,
  };
}
