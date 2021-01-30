import type { Point } from "../shapes";
import { getPointX, getPointY } from "../shapes";

export type WavePartsCache = {
  set: (point: Point, value: number) => void;
  get: (point: Point) => number;
};

export function makeWavePartsCache(): WavePartsCache {
  const cache = [];

  return {
    set(point, value) {
      if (!cache[getPointX(point)]) {
        cache[getPointX(point)] = [];
      }

      cache[getPointX(point)][getPointY(point)] = value;
    },
    get(point) {
      return cache[getPointX(point)]?.[getPointY(point)];
    },
  };
}
