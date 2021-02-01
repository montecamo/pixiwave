import { AbstractShape, Shape, Point } from "../shapes";
import {
  getPointX,
  getPointY,
  makePoint,
  makeShapeUtils,
  getShape,
} from "../shapes";

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

function average(nums) {
  return nums.reduce((a, b) => a + b);
}
export function getWaveShapesHeight<T extends Shape>(
  waveShapes: Array<WaveShape<T>>
): (point: Point) => number {
  return (point) => {
    return average(waveShapes.map(getWaveShapeHeight).map((f) => f(point)));
  };
}

export function makeRenderer(state: RenderState): PointRenderer {
  const shape = getRenderStateShape(state);
  const shapeUtils = makeShapeUtils(shape);

  const shapePoints = shapeUtils.getPoints(getShape(shape));

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

export function getNextRenderState(state: RenderState): RenderState {
  const waves = getRenderStateWaves(state);

  return makeRenderState(waves.map(shakeWaveShape), getRenderStateShape(state));
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
