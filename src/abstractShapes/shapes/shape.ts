import type { Point } from "./point";
import type { Rectangle } from "./rectangle";
import type { Circle } from "./circle";
import { makeRectangleUtils } from "./rectangle";
import { makeCircleUtils } from "./circle";

export type ShapeType = "rectangle" | "circle";
export type ShapeSize = number;
export type Shape = Rectangle | Circle;
export type AbstractShape<T extends Shape> = {
  type: ShapeType;
  shape: T;
};

export function makeShape<T extends Shape>(
  shape: T,
  type: ShapeType
): AbstractShape<T> {
  return { type, shape };
}

export function makeBasicShape<T extends Shape>(
  point: Point,
  type: ShapeType,
  size: ShapeSize
): AbstractShape<T> {
  const shapeUtils = makeShapeUtilsByType<T>(type);

  return makeShape<T>(shapeUtils.makeBasic(point, size), type);
}

export function getShapeType<T extends Shape>(
  shape: AbstractShape<T>
): ShapeType {
  return shape.type;
}

export function getShape<T extends Shape>(shape: AbstractShape<T>): T {
  return shape.shape;
}

export type ShapeUtils<T extends Shape> = {
  contains: (T) => (Point) => boolean;
  extend: (T) => Shape;
  getCentralShape: (T) => T;
  getCenter: (T) => Point;
  getExtremePoints: (T) => Array<Point>;
  makeBasic: (Point, size?: number) => T;
  getPoints: (T) => Array<Point>;
};

export function makeShapeUtilsByType<T extends Shape>(
  type: ShapeType
): ShapeUtils<T> {
  switch (type) {
    case "rectangle":
      return makeRectangleUtils();
    case "circle":
      return makeCircleUtils();
  }
}

export function makeShapeUtils<T extends Shape>(
  shape: AbstractShape<T>
): ShapeUtils<T> {
  return makeShapeUtilsByType(getShapeType(shape));
}
