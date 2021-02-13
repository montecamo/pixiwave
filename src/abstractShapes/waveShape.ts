import type { Shape, ShapeType, ShapeSize, Point } from "./shapes";
import { makeBasicShape, getShapeCenter, getShapePointDepth } from "./shapes";

import type { Wave, WaveType, WaveFunction, WaveSpeed } from "./wave";
import {
  increaseWave,
  getWavePart,
  makeBasicWave,
  updateWaveFunction,
  updateWaveSpeed,
} from "./wave";

export type WaveShape = {
  shape: Shape;
  wave: Wave;
};
export type ShapeOptions = {
  size: ShapeSize;
  type: ShapeType;
};
type WaveOptions = {
  func: WaveFunction;
  type: WaveType;
  speed: WaveSpeed;
};

function makeWaveShape(shape: Shape, wave: Wave): WaveShape {
  return { shape, wave };
}

function getWaveShapeShape(waveShape: WaveShape): Shape {
  return waveShape.shape;
}
function getWaveShapeWave(waveShape: WaveShape): Wave {
  return waveShape.wave;
}

export function getWaveShapeDepth(
  waveShape: WaveShape
): (point: Point) => number {
  return (point) => {
    const wave = getWaveShapeWave(waveShape);
    const shape = getWaveShapeShape(waveShape);

    const part = getShapePointDepth(shape)(point);

    return getWavePart(wave)(part);
  };
}

export function increaseWaveShape(waveShape: WaveShape): WaveShape {
  const shape = getWaveShapeShape(waveShape);
  const wave = getWaveShapeWave(waveShape);

  return makeWaveShape(shape, increaseWave(wave));
}

export function makeBasicWaveShape(
  point: Point,
  shapeOptions: ShapeOptions,
  waveOptions: WaveOptions
): WaveShape {
  const shape = makeBasicShape(point, shapeOptions.type, shapeOptions.size);
  const wave = makeBasicWave(waveOptions.type, waveOptions.func);

  return makeWaveShape(shape, wave);
}

export function updateWaveShapeShape(
  prevWaveShape: WaveShape,
  shapeOptions: ShapeOptions
): WaveShape {
  const prevShape = getWaveShapeShape(prevWaveShape);
  const prevShapeCenter = getShapeCenter(prevShape);

  const shape = makeBasicShape(
    prevShapeCenter,
    shapeOptions.type,
    shapeOptions.size
  );
  const wave = getWaveShapeWave(prevWaveShape);

  return makeWaveShape(shape, wave);
}

export function updateWaveShapeFunction(
  prevWaveShape: WaveShape,
  waveFunction: WaveFunction
): WaveShape {
  const shape = getWaveShapeShape(prevWaveShape);
  const wave = getWaveShapeWave(prevWaveShape);

  return makeWaveShape(shape, updateWaveFunction(wave, waveFunction));
}

export function updateWaveShapeSpeed(
  prevWaveShape: WaveShape,
  waveSpeed: WaveSpeed
): WaveShape {
  const shape = getWaveShapeShape(prevWaveShape);
  const wave = getWaveShapeWave(prevWaveShape);

  return makeWaveShape(shape, updateWaveSpeed(wave, waveSpeed));
}
