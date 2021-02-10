import type { Point } from "./point";

import { makePoint, getPointX, getPointY } from "./point";

export type Rectangle = {
  center: Point;
  width: number;
  height: number;
};

export type RectangleExtremePoints = {
  topLeft: Point;
  topRight: Point;
  bottomLeft: Point;
  bottomRight: Point;
};

export function makeRectangle(
  center: Point,
  width: number,
  height: number
): Rectangle {
  return { center, width, height };
}

export function makeBasicRectangle(center: Point, size: number = 1): Rectangle {
  return makeRectangle(center, size, size);
}

export function getRectangleCenter(rect: Rectangle): Point {
  return rect.center;
}

function getRectangleWidth(rect: Rectangle): number {
  return rect.width;
}

function getRectangleHeight(rect: Rectangle): number {
  return rect.height;
}

export function getRectangleCentralRectangle(rect: Rectangle): Rectangle {
  return makeRectangle(getRectangleCenter(rect), 1, 1);
}

export function extendRectangle(rect: Rectangle): Rectangle {
  return makeRectangle(
    getRectangleCenter(rect),
    getRectangleWidth(rect) + 2,
    getRectangleHeight(rect) + 2
  );
}

export function getRectangleExtremePoints(rect: Rectangle): Array<Point> {
  const centerX = getPointX(getRectangleCenter(rect));
  const centerY = getPointY(getRectangleCenter(rect));
  const halfWidth = getRectangleWidth(rect) / 2;
  const halfHeight = getRectangleHeight(rect) / 2;

  return [
    makePoint(centerX - halfWidth, centerY - halfHeight), // top left
    makePoint(centerX + halfWidth, centerY - halfHeight), // top right
    makePoint(centerX + halfWidth, centerY + halfHeight), // bottom right
    makePoint(centerX - halfWidth, centerY + halfHeight), // bottom left
  ];
}

export function isPointInRectangle(rect: Rectangle): (point: Point) => boolean {
  const [topLeft, , bottomRight] = getRectangleExtremePoints(rect);

  return (point) => {
    return (
      getPointX(topLeft) <= getPointX(point) &&
      getPointX(point) <= getPointX(bottomRight) &&
      getPointY(topLeft) <= getPointY(point) &&
      getPointY(point) <= getPointY(bottomRight)
    );
  };
}

export function getRectanglePoints(rect: Rectangle): Array<Point> {
  const [topLeft, , bottomRight] = getRectangleExtremePoints(rect);

  let points = [];

  for (let y = getPointY(topLeft); y <= getPointY(bottomRight); y++) {
    for (let x = getPointX(topLeft); x <= getPointX(bottomRight); x++) {
      if (isPointInRectangle(rect)(makePoint(x, y))) {
        points.push(makePoint(x, y));
      }
    }
  }

  return points;
}

export function getRectanglePointDepth(
  rect: Rectangle
): (point: Point) => number {
  return (point) => {
    const center = getRectangleCenter(rect);

    return Math.max(
      Math.abs(getPointX(center) - getPointX(point)),
      Math.abs(getPointY(center) - getPointY(point))
    );
  };
}
