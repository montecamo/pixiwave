import type { Point, ShapeType, Shape, AbstractShape } from "../shapes";
import { makeShapeUtilsByType, makeShape } from "../shapes";

import { makeWave, makeWaveShaker } from "../wave";
import {
  makeStepper,
  makeSinusoid,
  makeWavePartsCache,
  getMaxWaveLength,
} from "../utils";

import type { WaveShape } from "./waveShape";
import { makeWaveShape } from "./waveShape";

export type WaveOptions = {
  frequency: number;
  amplitude: number;
};

export function makeWaveShapeSpawner(
  base: AbstractShape<Shape>
): (
  point: Point,
  shapeType: ShapeType,
  options: WaveOptions
) => WaveShape<Shape> {
  return (point, shapeType, options) => {
    const { makeBasic } = makeShapeUtilsByType<Shape>(shapeType);

    const shape = makeShape(makeBasic(point), shapeType);
    const waveLength = getMaxWaveLength(base, shape) + 1;
    const cache = makeWavePartsCache();

    const wave = makeWave(waveLength);

    const shaker = makeWaveShaker(
      makeSinusoid(options.frequency, options.amplitude),
      makeStepper(0.001)
    );

    return makeWaveShape(shape, wave, cache, shaker);
  };
}
