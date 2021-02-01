import type {
  Shape,
  Point,
  ShapeType,
  AbstractShape,
  ShapeSize,
} from "./shapes";
import {
  makeShapeUtilsByType,
  makeShapeUtils,
  makeShape,
  getShape,
} from "./shapes";

export type BaseShape<T extends Shape> = AbstractShape<T>;
export type ShapeOptions = {
  size: ShapeSize;
  type: ShapeType;
};

export function makeBasicBaseShape<T extends Shape>(
  point: Point,
  shapeOptions: ShapeOptions
): BaseShape<T> {
  const { makeBasic } = makeShapeUtilsByType<T>(shapeOptions.type);

  return makeShape<T>(makeBasic(point, shapeOptions.size), shapeOptions.type);
}

export function updateBasicBaseShapeShape<T extends Shape>(
  prevShape: BaseShape<T>,
  shapeOptions: ShapeOptions
): AbstractShape<T> {
  const prevShapeUtils = makeShapeUtils(prevShape);
  const prevShapeCenter = prevShapeUtils.getCenter(getShape(prevShape));

  return makeBasicBaseShape<T>(prevShapeCenter, shapeOptions);
}
