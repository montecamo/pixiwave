import type { AbstractShape, Shape, Point } from "../shapes";
import type { WavePartsCache } from "../utils";

import type { Wave, WaveShaker } from "../wave";
import { makeWavePartCalculator } from "../utils";

export type WaveShape<T extends Shape> = {
  shape: AbstractShape<T>;
  wave: Wave;
  cache: WavePartsCache;
  shaker: WaveShaker;
};

export function makeWaveShape<T extends Shape>(
  shape: AbstractShape<T>,
  wave: Wave,
  cache: WavePartsCache,
  shaker: WaveShaker
): WaveShape<T> {
  return { shape, wave, cache, shaker };
}

export function getWaveShapeShape<T extends Shape>(waveShape: WaveShape<T>) {
  return waveShape.shape;
}
export function getWaveShapeWave<T extends Shape>(waveShape: WaveShape<T>) {
  return waveShape.wave;
}
export function getWaveShapeCache<T extends Shape>(waveShape: WaveShape<T>) {
  return waveShape.cache;
}
export function getWaveShapeShaker<T extends Shape>(waveShape: WaveShape<T>) {
  return waveShape.shaker;
}

export function getWaveShapeHeight<T extends Shape>(
  waveShape: WaveShape<T>
): (point: Point) => number {
  return (point) => {
    const wave = getWaveShapeWave(waveShape);
    const shape = getWaveShapeShape(waveShape);
    const cache = getWaveShapeCache(waveShape);

    if (cache.get(point)) {
      return wave[cache.get(point)];
    }

    const part = makeWavePartCalculator(shape)(point);

    cache.set(point, part);

    return wave[part];
  };
}

export function shakeWaveShape<T extends Shape>(
  waveShape: WaveShape<T>
): WaveShape<T> {
  const shape = getWaveShapeShape(waveShape);
  const wave = getWaveShapeWave(waveShape);
  const cache = getWaveShapeCache(waveShape);
  const shaker = getWaveShapeShaker(waveShape);

  return makeWaveShape(shape, shaker(wave), cache, shaker);
}
