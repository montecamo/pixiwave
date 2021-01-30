import type { Shape, AbstractShape, Point } from "./shapes";
import { makeShapeUtils, getShape } from "./shapes";

export function getMaxWaveDepth<T extends Shape, U extends Shape>(
  baseShape: AbstractShape<T>,
  waveShape: AbstractShape<U>
): number {
  const { getExtremePoints } = makeShapeUtils(baseShape);

  const extremePoints = getExtremePoints(getShape(baseShape));

  const calcDepth = makeShapeLayerCalculator(waveShape);

  return Math.max(...extremePoints.map(calcDepth));
}

export function makeShapeLayerCalculator<T extends Shape>(
  shape: AbstractShape<T>
): (Point) => number {
  const shapeUtils = makeShapeUtils(shape);

  return (point) => {
    const helper = (layer: number, shape: Shape) => {
      if (shapeUtils.contains(shape)(point)) {
        return layer;
      }

      return helper(layer + 1, shapeUtils.extend(shape));
    };

    return helper(0, getShape(shape));
  };
}
