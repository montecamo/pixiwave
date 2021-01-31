import type { AbstractShape, Shape, Point } from "../shapes";
import { getPointX, getPointY, makePoint } from "../shapes";

import { getShapePoints } from "../utils";

import type { WaveShape } from "./waveShape";
import { getWaveShapeHeight, shakeWaveShape } from "./waveShape";

type RenderWaves = Array<WaveShape<Shape>>;
type RenderShape = AbstractShape<Shape>;

type RenderState = {
  waves: RenderWaves;
  shape: RenderShape;
};

export function makeRenderState(
  waves: RenderWaves,
  shape: RenderShape
): RenderState {
  return { waves, shape };
}

export function getRenderStateWaves(state: RenderState): RenderWaves {
  return state.waves;
}
export function getRenderStateShape(state: RenderState): RenderShape {
  return state.shape;
}

export type PointRenderer = (Point) => void;

export function getWaveShapesHeight<T extends Shape>(
  waveShapes: Array<WaveShape<T>>
): (point: Point) => number {
  return (point) => {
    return Math.max(...waveShapes.map(getWaveShapeHeight).map((f) => f(point)));
  };
}

export function makeRenderer(state: RenderState): PointRenderer {
  const shapePoints = getShapePoints(getRenderStateShape(state));

  return (renderPoint) => {
    shapePoints.forEach((point) => {
      renderPoint(
        makePoint(
          getPointX(point),
          getPointY(point),
          getWaveShapesHeight(getRenderStateWaves(state))(point)
        )
      );
    });
  };
}

export function getNextState(state: RenderState): RenderState {
  const waves = getRenderStateWaves(state);

  return makeRenderState(waves.map(shakeWaveShape), getRenderStateShape(state));
}

export function addWaveToState(
  state: RenderState,
  wave: WaveShape<Shape>
): RenderState {
  const waves = getRenderStateWaves(state);

  return makeRenderState(waves.concat(wave), getRenderStateShape(state));
}

export function updateStateShape(
  state: RenderState,
  shape: AbstractShape<Shape>
): RenderState {
  return makeRenderState(getRenderStateWaves(state), shape);
}
