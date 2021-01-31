import type { Shape, Point, ShapeType, AbstractShape } from "../shapes";
import { makeShapeUtilsByType, makeShape } from "../shapes";

export function spawnBaseShape<T extends Shape>(
  point: Point,
  shapeType: ShapeType,
  size: number
): AbstractShape<T> {
  const { makeBasic } = makeShapeUtilsByType<T>(shapeType);

  return makeShape<T>(makeBasic(point, size), shapeType);
}
