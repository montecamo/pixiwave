import { square } from "../../utils";
import type { Point } from "./point";
import type { ShapeUtils } from "./shape";

import { makePoint, getPointX, getPointY } from "./point";

export type Circle = {
  center: Point;
  radius: number;
};

export function makeCircle(center: Point, radius: number): Circle {
  return { center, radius };
}

export function makeBasicCircle(center: Point, size: number = 0.5): Circle {
  return makeCircle(center, size);
}

function getCircleCenter(circle: Circle): Point {
  return circle.center;
}

function getCircleRadius(circle: Circle): number {
  return circle.radius;
}

function getCircleCentralShape(circle: Circle): Circle {
  return makeCircle(getCircleCenter(circle), 0.5);
}

function extendCircle(circle: Circle): Circle {
  return makeCircle(getCircleCenter(circle), getCircleRadius(circle) + 1);
}

export function getCircleExtremePoints(circle: Circle): Array<Point> {
  throw new Error("circle is round, lol");
}

function isPointInCircle(circle: Circle): (point: Point) => boolean {
  return (point) => {
    // (x - center_x)^2 + (y - center_y)^2 < radius^2

    const center = getCircleCenter(circle);
    const centerX = getPointX(center);
    const centerY = getPointY(center);
    const pointX = getPointX(point);
    const pointY = getPointY(point);
    const radius = getCircleRadius(circle);

    return square(pointX - centerX) + square(pointY - centerY) < square(radius);
  };
}

export function makeCircleUtils(): ShapeUtils<Circle> {
  return {
    getCentralShape: getCircleCentralShape,
    getExtremePoints: getCircleExtremePoints,
    getCenter: getCircleCenter,
    contains: isPointInCircle,
    extend: extendCircle,
    makeBasic: makeBasicCircle,
  };
}
