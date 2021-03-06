import type {
  WaveShape,
  WaveFunction,
  WaveSpeed,
  Shape,
  Point,
} from "../abstractShapes";
import {
  getWaveShapeDepth,
  increaseWaveShape,
  getShapePoints,
  makePoint,
  getPointX,
  getPointY,
  interfereWaves,
  updateWaveShapeFunction,
  updateWaveShapeSpeed,
  getWaveShapeSize,
  getWaveShapeType,
  getWaveShapeColor,
  getShapeSize,
} from "../abstractShapes";
import type { Color } from "../utils";
import { mixColors } from "../utils";

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

// --------------------------------------------------------------------------------------------------

export function makeRenderer(shape: Shape): Renderer {
  let state = makeInitialRenderState(shape);

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

  function updateShape(shape) {
    state = makeRenderState(getRenderStateWaves(state), shape);
  }

  function isWaveFinished(wave) {
    const shape = getRenderStateShape(state);

    return (
      getWaveShapeType(wave) === "pulse" &&
      getShapeSize(shape) * 3 < getWaveShapeSize(wave)
    );
  }

  function tick() {
    const waves = getRenderStateWaves(state);

    state = makeRenderState(
      waves.map(increaseWaveShape).filter((w) => !isWaveFinished(w)),
      getRenderStateShape(state)
    );
  }

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
            .map((wave) => getWaveShapeDepth(wave)(point))
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
        (wave) => getWaveShapeDepth(wave)(point) > 0
      );

      if (intersectingWaves.length) {
        return mixColors(intersectingWaves.map(getWaveShapeColor));
      }

      return undefined;
    });

    return ret;
  }

  return {
    render,
    renderColors,
    updateWaveFunction,
    updateWaveSpeed,
    addWave,
    tick,
    updateShape,
    clearWaves,
  };
}
