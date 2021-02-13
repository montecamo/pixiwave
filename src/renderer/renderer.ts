import type { WaveShape, WaveFunction, Shape, Point } from "../abstractShapes";
import {
  getWaveShapeDepth,
  increaseWaveShape,
  getShapePoints,
  makePoint,
  getPointX,
  getPointY,
  interfereWaves,
  updateWaveShapeFunction,
} from "../abstractShapes";

type RenderWaves = Array<WaveShape>;
type RenderShape = Shape;

type RenderState = {
  waves: RenderWaves;
  shape: RenderShape;
};
type Renderer = {
  addWave(wave: WaveShape): void;
  updateWaveFunction(f: WaveFunction): void;
  updateShape(shape: Shape): void;
  render(): Array<Point>;
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

  function updateWaveFunction(f) {
    state = makeRenderState(
      getRenderStateWaves(state).map((wave) =>
        updateWaveShapeFunction(wave, f)
      ),
      getRenderStateShape(state)
    );
  }

  function updateShape(shape) {
    state = makeRenderState(getRenderStateWaves(state), shape);
  }

  function tick() {
    const waves = getRenderStateWaves(state);

    state = makeRenderState(
      waves.map(increaseWaveShape),
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
        interfereWaves(waves.map((wave) => getWaveShapeDepth(wave)(point)))
      );
    });
  }

  return {
    render,
    updateWaveFunction,
    addWave,
    tick,
    updateShape,
  };
}
