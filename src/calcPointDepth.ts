import type { Point, Shape, ShapeUtils } from "./shapes";

export type PointDepthCalculator = (point: Point) => number;

export function makePointDepthCalculator(
  shape: Shape,
  utils: ShapeUtils<Shape>
): PointDepthCalculator {
  return (point) => {
    const helper = (depth, shape) => {
      if (utils.contains(shape)(point)) {
        return depth;
      }

      return helper(depth - 1, utils.extend(shape));
    };

    return helper(utils.getDepth(shape), utils.getCenter(shape));
  };
}
