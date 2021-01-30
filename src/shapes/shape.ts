import type { Point } from "./point";
import type { Rectangle } from "./rectangle";
import { makeRectangleUtils } from "./rectangle";

export type ShapeType = "rectangle";
export type Shape = Rectangle;
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
  getCentralShape: (T) => Shape;
  getCenter: (T) => Point;
  getExtremePoints: (T) => Array<Point>;
};

export function makeShapeUtils<T extends Shape>(
  shape: AbstractShape<T>
): ShapeUtils<T> {
  switch (getShapeType(shape)) {
    case "rectangle":
      return makeRectangleUtils();
  }
}
