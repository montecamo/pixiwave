import type {
  WaveShape,
  WaveFunction,
  WaveSpeed,
  Shape,
  Point,
} from "../models";
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
} from "../models";
import type { Color } from "../utils";
import { brighten, mixColors } from "../utils";
import { isWaveFinished } from "./utils";

type RenderWaves = Array<WaveShape>;
type RenderShape = Shape;
type RenderState = {
  waves: RenderWaves;
  shape: RenderShape;
};

type Renderer = {
  addWave(wave: WaveShape): void;
  clearWaves(): void;
  updateWaveFunction(f: WaveFunction): void;
  updateWaveSpeed(speed: WaveSpeed): void;
  updateShape(shape: Shape): void;
  render(): Array<Point>;
  renderColors(): Array<Color>;
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
  function render(): Array<Point> {
    const shape = getRenderStateShape(state);
    const waves = getRenderStateWaves(state);
    const shapePoints = getShapePoints(shape);

    return shapePoints.map((point) => {
      return makePoint(
        getPointX(point),
        getPointY(point),
        interfereWaves(
          waves
            .map((wave) => getWaveShapePointDepth(wave, point))
            .filter((d) => d >= 0)
        )
      );
    });
  }

  function renderColors(): Array<Color> {
    const shape = getRenderStateShape(state);
    const waves = getRenderStateWaves(state);
    const shapePoints = getShapePoints(shape);

    const ret = shapePoints.map((point) => {
      const intersectingWaves = waves.filter(
        (wave) => getWaveShapePointDepth(wave, point) > 0
      );
      const height = interfereWaves(
        waves
          .map((wave) => getWaveShapePointDepth(wave, point))
          .filter((d) => d >= 0)
      );

      if (intersectingWaves.length) {
        return brighten(
          mixColors(intersectingWaves.map(getWaveShapeColor)),
          height / 10
        );
      }

      return undefined;
    });

    return ret;
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
    renderColors,
    getWavesCount,
  };
}
