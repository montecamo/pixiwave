import type { Point, ShapeType, Shape, ShapeSize } from "./shapes";
import { makeBasicShape, getShapeCenter, getShapePoints } from "./shapes";

export type BaseShape = Shape;
export type ShapeOptions = {
  size: ShapeSize;
  type: ShapeType;
};

export function makeBasicBaseShape(
  point: Point,
  shapeOptions: ShapeOptions
): BaseShape {
  return makeBasicShape(point, shapeOptions.type, shapeOptions.size);
}

export function updateBaseShapeShape(
  prevShape: BaseShape,
  shapeOptions: ShapeOptions
): Shape {
  const prevShapeCenter = getShapeCenter(prevShape);

  return makeBasicBaseShape(prevShapeCenter, shapeOptions);
}

export function getBaseShapePoints(shape: BaseShape): Array<Point> {
  return getShapePoints(shape);
}
