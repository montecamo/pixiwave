import type { Shape, Point } from "./shapes";
import {
  distanceBetweenPoints,
  getShapeExtremePoints,
  getShapeCenter,
} from "./shapes";

export function getMaxWaveLength(baseShape: Shape, waveShape: Shape): number {
  const extremePoints = getShapeExtremePoints(baseShape);

  const calcMaxDepth = makeWaveDepthCalculator(waveShape);

  return Math.max(...extremePoints.map(calcMaxDepth));
}

export function makeWaveDepthCalculator(shape: Shape): (Point) => number {
  const centerPoint = getShapeCenter(shape);

  return (point) => {
    return distanceBetweenPoints(centerPoint, point);
  };
}
