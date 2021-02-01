import type { Shape, AbstractShape, Point } from "./shapes";
import { makeShapeUtils, getShape, distanceBetweenPoints } from "./shapes";

export function getMaxWaveLength<T extends Shape, U extends Shape>(
  baseShape: AbstractShape<T>,
  waveShape: AbstractShape<U>
): number {
  const { getExtremePoints } = makeShapeUtils(baseShape);

  const extremePoints = getExtremePoints(getShape(baseShape));

  const calcMaxDepth = makeWaveDepthCalculator(waveShape);

  return Math.max(...extremePoints.map(calcMaxDepth));
}

export function makeWaveDepthCalculator<T extends Shape>(
  shape: AbstractShape<T>
): (Point) => number {
  const shapeUtils = makeShapeUtils(shape);
  const centerPoint = shapeUtils.getCenter(getShape(shape));

  return (point) => {
    return distanceBetweenPoints(centerPoint, point);
  };
}
