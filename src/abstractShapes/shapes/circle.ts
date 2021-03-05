import { square } from "../../utils";
import type { Point } from "./point";

import {
  makePoint,
  getPointX,
  getPointY,
  distanceBetweenPoints,
} from "./point";

export type Circle = {
  center: Point;
  radius: number;
};

function makeCircle(center: Point, size: number): Circle {
  return { center, radius: size / 2 };
}

export function makeBasicCircle(center: Point, size: number = 0.5): Circle {
  return makeCircle(center, size);
}

export function getCircleCenter(circle: Circle): Point {
  return circle.center;
}

function getCircleRadius(circle: Circle): number {
  return circle.radius;
}

export function getCircleSize(circle: Circle): number {
  return circle.radius * 2;
}

export function getCircleCentralCircle(circle: Circle): Circle {
  return makeCircle(getCircleCenter(circle), 0.5);
}

export function extendCircle(circle: Circle): Circle {
  return makeCircle(getCircleCenter(circle), getCircleRadius(circle) + 1);
}

export function getCircleExtremePoints(circle: Circle): Array<Point> {
  throw new Error("circle is round, lol");
}

export function isPointInCircle(circle: Circle): (point: Point) => boolean {
  return (point) => {
    const center = getCircleCenter(circle);
    const centerX = getPointX(center);
    const centerY = getPointY(center);

    const pointX = getPointX(point);
    const pointY = getPointY(point);

    const radius = getCircleRadius(circle);

    return square(pointX - centerX) + square(pointY - centerY) < square(radius);
  };
}

export function getCirclePoints(circle: Circle): Array<Point> {
  const center = getCircleCenter(circle);
  const radius = getCircleRadius(circle);

  const topLeft = makePoint(
    getPointX(center) - radius,
    getPointY(center) - radius
  );
  const bottomRight = makePoint(
    getPointX(center) + radius,
    getPointY(center) + radius
  );

  let points = [];

  for (let y = getPointY(topLeft); y <= getPointY(bottomRight); y++) {
    for (let x = getPointX(topLeft); x <= getPointX(bottomRight); x++) {
      if (isPointInCircle(circle)(makePoint(x, y))) {
        points.push(makePoint(x, y));
      }
    }
  }

  return points;
}

export function getCirclePointDepth(circle: Circle): (point: Point) => number {
  return (point) => {
    const center = getCircleCenter(circle);

    return distanceBetweenPoints(center, point);
  };
}
