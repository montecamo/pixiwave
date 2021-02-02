import type {
  AbstractShape,
  Shape,
  ShapeType,
  ShapeSize,
  Point,
} from "./shapes";
import { makeBasicShape, makeShapeUtils, getShape } from "./shapes";

import type {
  AbstractWave,
  AbstractWaveType,
  AbstractWaveFunction,
} from "./wave";
import {
  increaseAbstractWave,
  makeAbstractWavePartGetter,
  makeAbstractWaveOfType,
} from "./wave";

import { makeWaveDepthCalculator } from "./waveDepth";

export type WaveShape<T extends Shape> = {
  shape: AbstractShape<T>;
  wave: AbstractWave;
  waveFunction: AbstractWaveFunction;
};
type ShapeOptions = {
  size: ShapeSize;
  type: ShapeType;
};
type WaveOptions = {
  function: AbstractWaveFunction;
  type: AbstractWaveType;
};

function makeWaveShape<T extends Shape>(
  shape: AbstractShape<T>,
  wave: AbstractWave,
  waveFunction: AbstractWaveFunction
): WaveShape<T> {
  return { shape, wave, waveFunction };
}

function getWaveShapeShape<T extends Shape>(
  waveShape: WaveShape<T>
): AbstractShape<T> {
  return waveShape.shape;
}
function getWaveShapeWave<T extends Shape>(
  waveShape: WaveShape<T>
): AbstractWave {
  return waveShape.wave;
}
function getWaveShapeWaveFunction<T extends Shape>(
  waveShape: WaveShape<T>
): AbstractWaveFunction {
  return waveShape.waveFunction;
}

export function getWaveShapeDepth<T extends Shape>(
  waveShape: WaveShape<T>
): (point: Point) => number {
  return (point) => {
    const wave = getWaveShapeWave(waveShape);
    const shape = getWaveShapeShape(waveShape);
    const waveFunction = getWaveShapeWaveFunction(waveShape);

    const part = makeWaveDepthCalculator(shape)(point);

    return makeAbstractWavePartGetter(waveFunction)(wave)(part);
  };
}

export function increaseWaveShape<T extends Shape>(
  waveShape: WaveShape<T>
): WaveShape<T> {
  const shape = getWaveShapeShape(waveShape);
  const wave = getWaveShapeWave(waveShape);
  const waveFunction = getWaveShapeWaveFunction(waveShape);

  return makeWaveShape(shape, increaseAbstractWave(wave), waveFunction);
}

export function makeBasicWaveShape<T extends Shape>(
  point: Point,
  shapeOptions: ShapeOptions,
  waveOptions: WaveOptions
): WaveShape<T> {
  const shape = makeBasicShape<T>(point, shapeOptions.type, shapeOptions.size);
  const wave = makeAbstractWaveOfType(waveOptions.type);

  return makeWaveShape(shape, wave, waveOptions.function);
}

export function updateWaveShapeShape<T extends Shape>(
  prevWaveShape: WaveShape<T>,
  shapeOptions: ShapeOptions
): WaveShape<T> {
  const prevShape = getWaveShapeShape(prevWaveShape);
  const prevShapeUtils = makeShapeUtils(prevShape);
  const prevShapeCenter = prevShapeUtils.getCenter(getShape(prevShape));

  const shape = makeBasicShape<T>(
    prevShapeCenter,
    shapeOptions.type,
    shapeOptions.size
  );
  const wave = getWaveShapeWave(prevWaveShape);
  const waveFunction = getWaveShapeWaveFunction(prevWaveShape);

  return makeWaveShape(shape, wave, waveFunction);
}

export function updateWaveShapeFunction<T extends Shape>(
  prevWaveShape: WaveShape<T>,
  waveFunction: AbstractWaveFunction
): WaveShape<T> {
  const shape = getWaveShapeShape(prevWaveShape);
  const wave = getWaveShapeWave(prevWaveShape);

  return makeWaveShape(shape, wave, waveFunction);
}
