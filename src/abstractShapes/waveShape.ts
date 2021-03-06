import { getTaggedType, randomColor } from "../utils";
import type { Shape, ShapeType, ShapeSize, Point } from "./shapes";
import { makeBasicShape, getShapeCenter, getShapePointDepth } from "./shapes";

import type { Wave, WaveType, WaveFunction, WaveSpeed } from "./wave";
import {
  increaseWave,
  getWavePart,
  getWaveDistance,
  makeBasicWave,
  updateWaveFunction,
  updateWaveSpeed,
} from "./wave";

export type WaveShapeColor = string;
export type WaveShape = {
  shape: Shape;
  wave: Wave;
  color: WaveShapeColor;
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

function makeWaveShape(
  shape: Shape,
  wave: Wave,
  color: WaveShapeColor
): WaveShape {
  return { shape, wave, color };
}

function getWaveShapeShape(waveShape: WaveShape): Shape {
  return waveShape.shape;
}
function getWaveShapeWave(waveShape: WaveShape): Wave {
  return waveShape.wave;
}
export function getWaveShapeColor(waveShape: WaveShape): WaveShapeColor {
  return waveShape.color;
}

export function getWaveShapeDepth(
  waveShape: WaveShape
): (point: Point) => number {
  return (point) => {
    const wave = getWaveShapeWave(waveShape);
    const shape = getWaveShapeShape(waveShape);

    const part = getShapePointDepth(shape)(point);

    return Math.abs(getWavePart(wave)(part));
  };
}

export function increaseWaveShape(waveShape: WaveShape): WaveShape {
  const shape = getWaveShapeShape(waveShape);
  const wave = getWaveShapeWave(waveShape);
  const color = getWaveShapeColor(waveShape);

  return makeWaveShape(shape, increaseWave(wave), color);
}

export function makeBasicWaveShape(
  point: Point,
  shapeOptions: ShapeOptions,
  waveOptions: WaveOptions
): WaveShape {
  const shape = makeBasicShape(point, shapeOptions.type, shapeOptions.size);
  const wave = makeBasicWave(waveOptions.type, waveOptions.func);
  const color = randomColor();

  return makeWaveShape(shape, wave, color);
}

export function getWaveShapeSize(waveShape: WaveShape): number {
  const wave = getWaveShapeWave(waveShape);

  return getWaveDistance(wave);
}

export function getWaveShapeType(waveShape: WaveShape): WaveType {
  const wave = getWaveShapeWave(waveShape);

  return getTaggedType(wave);
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
  const color = getWaveShapeColor(prevWaveShape);

  return makeWaveShape(shape, wave, color);
}

export function updateWaveShapeFunction(
  prevWaveShape: WaveShape,
  waveFunction: WaveFunction
): WaveShape {
  const shape = getWaveShapeShape(prevWaveShape);
  const wave = getWaveShapeWave(prevWaveShape);
  const color = getWaveShapeColor(prevWaveShape);

  return makeWaveShape(shape, updateWaveFunction(wave, waveFunction), color);
}

export function updateWaveShapeSpeed(
  prevWaveShape: WaveShape,
  waveSpeed: WaveSpeed
): WaveShape {
  const shape = getWaveShapeShape(prevWaveShape);
  const wave = getWaveShapeWave(prevWaveShape);
  const color = getWaveShapeColor(prevWaveShape);

  return makeWaveShape(shape, updateWaveSpeed(wave, waveSpeed), color);
}
