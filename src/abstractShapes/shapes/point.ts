import { square } from "../../utils";

export type Point = {
  x: number;
  y: number;
  z: number;
};

export const makePoint = (x: number, y: number, z: number = 0) => ({ x, y, z });

export const getPointX = (point: Point) => point.x;
export const getPointY = (point: Point) => point.y;
export const getPointZ = (point: Point) => point.z;

export function distanceBetweenPoints(a: Point, b: Point): number {
  return Math.abs(
    Math.sqrt(
      square(getPointX(a) - getPointX(b)) + square(getPointY(a) - getPointY(b))
    )
  );
}
