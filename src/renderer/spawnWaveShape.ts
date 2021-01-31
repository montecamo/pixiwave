import type { Point, ShapeType } from "../shapes";
import { makeShapeUtilsByType, makeShape } from "../shapes";

import { makeWave, makeWaveShaker } from "../wave";
import { makeStepper, makeSinusoid, makeWavePartsCache } from "../utils";

import { makeWaveShape } from "./waveShape";

export type WaveOptions = {
  frequency: number;
  amplitude: number;
  length: number;
};

export function spawnWaveShape(
  point: Point,
  shapeType: ShapeType,
  options: WaveOptions
) {
  const { makeBasic } = makeShapeUtilsByType(shapeType);

  const shape = makeShape(makeBasic(point), shapeType);
  const cache = makeWavePartsCache();

  const wave = makeWave(options.length);

  const shaker = makeWaveShaker(
    makeSinusoid(options.frequency, options.amplitude),
    makeStepper(0.001)
  );

  return makeWaveShape(shape, wave, cache, shaker);
}
