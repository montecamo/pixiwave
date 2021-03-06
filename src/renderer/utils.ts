import type { WaveShape, Shape } from "../models";

import { getWaveShapeSize, getWaveShapeType, getShapeSize } from "../models";

export function isWaveFinished(shape: Shape, wave: WaveShape) {
  return (
    getWaveShapeType(wave) === "pulse" &&
    getShapeSize(shape) * 2 < getWaveShapeSize(wave)
  );
}
