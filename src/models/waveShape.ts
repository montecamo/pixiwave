import { getTaggedType, randomColor } from '../utils';
import type { Color } from '../utils';
import type { Shape, ShapeType, ShapeSize, Point } from './shapes';
import { makeBasicShape, getShapePointDepth } from './shapes';

import type { Wave, WaveType, WaveFunction, WaveSpeed } from './wave';
import {
  increaseWave,
  getWavePart,
  getWaveDistance,
  makeBasicWave,
  updateWaveFunction,
  updateWaveSpeed,
} from './wave';

export type WaveShape = {
  shape: Shape;
  wave: Wave;
  color: Color;
};

// CONSTRUCTORS
function makeWaveShape(shape: Shape, wave: Wave, color: Color): WaveShape {
  return { shape, wave, color };
}

export function makeBasicWaveShape(
  point: Point,
  shapeOptions: { type: ShapeType },
  waveOptions: {
    func: WaveFunction;
    type: WaveType;
    speed: WaveSpeed;
  }
): WaveShape {
  const shape = makeBasicShape(point, shapeOptions.type);
  const wave = makeBasicWave(waveOptions.type, waveOptions.func);
  const color = randomColor();

  return makeWaveShape(shape, wave, color);
}

// GETTERS
function getWaveShapeShape(waveShape: WaveShape): Shape {
  return waveShape.shape;
}
function getWaveShapeWave(waveShape: WaveShape): Wave {
  return waveShape.wave;
}
export function getWaveShapeColor(waveShape: WaveShape): Color {
  return waveShape.color;
}

export function getWaveShapePointDepth(
  waveShape: WaveShape,
  point: Point
): number {
  const wave = getWaveShapeWave(waveShape);
  const shape = getWaveShapeShape(waveShape);

  const part = getShapePointDepth(shape, point);

  return Math.abs(getWavePart(wave, part));
}

export function getWaveShapeSize(waveShape: WaveShape): number {
  const wave = getWaveShapeWave(waveShape);

  return getWaveDistance(wave);
}

export function getWaveShapeType(waveShape: WaveShape): WaveType {
  const wave = getWaveShapeWave(waveShape);

  return getTaggedType(wave);
}

// MUTATORS
export function increaseWaveShape(waveShape: WaveShape): WaveShape {
  const shape = getWaveShapeShape(waveShape);
  const wave = getWaveShapeWave(waveShape);
  const color = getWaveShapeColor(waveShape);

  return makeWaveShape(shape, increaseWave(wave), color);
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
