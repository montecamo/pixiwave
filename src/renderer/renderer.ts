import type {
  WaveShape,
  WaveFunction,
  AbstractShape,
  Point,
  Shape,
} from "../abstractShapes";
import {
  getWaveShapeDepth,
  updateWaveShapeFunction,
  increaseWaveShape,
  getBaseShapePoints,
  makePoint,
  getPointX,
  getPointY,
} from "../abstractShapes";

type RenderWaves = Array<WaveShape<Shape>>;
type RenderShape = AbstractShape<Shape>;

type RenderState = {
  waves: RenderWaves;
  shape: RenderShape;
};
type RenderCallback = (point: Point) => void;
type Renderer = {
  addWave(wave: WaveShape<Shape>): void;
  updateWaveFunction(f: WaveFunction): void;
  render(callback: RenderCallback): void;
  tick(): void;
};

export function makeRenderState(
  waves: RenderWaves,
  shape: RenderShape
): RenderState {
  return { waves, shape };
}

function makeInitialRenderState(shape: AbstractShape<Shape>): RenderState {
  return makeRenderState([], shape);
}

export function getRenderStateWaves(state: RenderState): RenderWaves {
  return state.waves;
}
export function getRenderStateShape(state: RenderState): RenderShape {
  return state.shape;
}

export function addWaveToRenderState(
  state: RenderState,
  wave: WaveShape<Shape>
): RenderState {
  const waves = getRenderStateWaves(state);

  return makeRenderState(waves.concat(wave), getRenderStateShape(state));
}
export function updateRenderStateShape(
  state: RenderState,
  shape: AbstractShape<Shape>
): RenderState {
  return makeRenderState(getRenderStateWaves(state), shape);
}
export function mapRenderStateWaves(
  state: RenderState,
  cb: (wave: WaveShape<Shape>) => WaveShape<Shape>
): RenderState {
  return makeRenderState(state.waves.map(cb), getRenderStateShape(state));
}

export function renderRenderState(
  state: RenderState,
  callback: RenderCallback
): void {
  const shape = getRenderStateShape(state);
  const waves = getRenderStateWaves(state);
  const shapePoints = getBaseShapePoints(shape);

  shapePoints.forEach((point) => {
    callback(
      makePoint(
        getPointX(point),
        getPointY(point),
        Math.max(...waves.map((wave) => getWaveShapeDepth(wave)(point)))
      )
    );
  });
}

export function getNextRenderState(state: RenderState): RenderState {
  const waves = getRenderStateWaves(state);

  return makeRenderState(
    waves.map(increaseWaveShape),
    getRenderStateShape(state)
  );
}

// --------------------------------------------------------------------------------------------------

export function makeRenderer(shape: AbstractShape<Shape>): Renderer {
  let state = makeInitialRenderState(shape);

  function addWave(wave) {
    state = addWaveToRenderState(state, wave);
  }

  function updateWaveFunction(f) {
    state = mapRenderStateWaves(state, (wave) =>
      updateWaveShapeFunction(wave, f)
    );
  }

  function tick() {
    state = getNextRenderState(state);
  }

  function render(cb) {
    renderRenderState(state, cb);
  }

  return {
    render,
    updateWaveFunction,
    addWave,
    tick,
  };
}