import type { Shape, AbstractShape, Point } from "../shapes";
import {
  getShape,
  makeShapeUtils,
  getPointX,
  getPointY,
  makePoint,
} from "../shapes";

import { shapeToRectangle } from "./shapeToRectangle";

export function getShapePoints<T extends Shape>(
  shape: AbstractShape<T>
): Array<Point> {
  const rectShape = shapeToRectangle(shape);
  const rectUtils = makeShapeUtils(rectShape);
  const shapeUtils = makeShapeUtils(shape);

  const [topLeft, , bottomRight] = rectUtils.getExtremePoints(
    getShape(rectShape)
  );

  const points = [];

  for (let y = getPointY(topLeft); y < getPointY(bottomRight); y++) {
    for (let x = getPointX(topLeft); x < getPointX(bottomRight); x++) {
      if (shapeUtils.contains(getShape(shape))(makePoint(x, y))) {
        points.push(makePoint(x, y));
      }
    }
  }

  return points;
}
