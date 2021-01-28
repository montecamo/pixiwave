import type { Point } from "./point";

export type ShapeUtils<Shape> = {
  contains: (Shape) => (Point) => boolean;
  extend: (Shape) => Shape;
  getDepth: (Shape) => number;
  getCenter: (Shape) => Shape;
};
