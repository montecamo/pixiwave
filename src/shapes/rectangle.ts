import type { Point } from "./point";
import type { ShapeUtils } from "./utils";

import { getPointX, getPointY } from "./point";
import { isEven } from "../utils";

export type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function makeRectangle(
  x: number,
  y: number,
  width: number,
  height: number
): Rectangle {
  return { x, y, width, height };
}

function getRectangleX(rect: Rectangle): number {
  return rect.x;
}

function getRectangleY(rect: Rectangle): number {
  return rect.y;
}

function getRectangleWidth(rect: Rectangle): number {
  return rect.width;
}

function getRectangleHeight(rect: Rectangle): number {
  return rect.height;
}

function getRectangleDepth(rect: Rectangle): number {
  return Math.max(
    Math.ceil(getRectangleWidth(rect) / 2),
    Math.ceil(getRectangleHeight(rect) / 2)
  );
}

function getRectangleCenter(rect: Rectangle): Rectangle {
  if (isEven(getRectangleWidth(rect)) && isEven(getRectangleHeight(rect))) {
    return makeRectangle(
      getRectangleX(rect) + getRectangleWidth(rect) / 2 - 1,
      getRectangleY(rect) + getRectangleHeight(rect) / 2 - 1,
      1,
      1
    );
  }

  if (isEven(getRectangleHeight(rect))) {
    return makeRectangle(
      getRectangleX(rect) + Math.floor(getRectangleWidth(rect) / 2),
      getRectangleY(rect) + getRectangleHeight(rect) / 2 - 1,
      0,
      1
    );
  }

  if (isEven(getRectangleWidth(rect))) {
    return makeRectangle(
      getRectangleX(rect) + getRectangleWidth(rect) / 2 - 1,
      getRectangleY(rect) + Math.floor(getRectangleHeight(rect) / 2),
      1,
      0
    );
  }

  return makeRectangle(
    getRectangleX(rect) + Math.floor(getRectangleWidth(rect) / 2),
    getRectangleY(rect) + Math.floor(getRectangleHeight(rect) / 2),
    0,
    0
  );
}

function extendRectangle(rect: Rectangle): Rectangle {
  return makeRectangle(
    getRectangleX(rect) - 1,
    getRectangleY(rect) - 1,
    getRectangleWidth(rect) + 2,
    getRectangleHeight(rect) + 2
  );
}

function isPointInRectangle(rect: Rectangle): (point: Point) => boolean {
  return (point) => {
    return (
      getRectangleX(rect) <= getPointX(point) &&
      getPointX(point) <= getRectangleX(rect) + getRectangleWidth(rect) &&
      getRectangleY(rect) <= getPointY(point) &&
      getPointY(point) <= getRectangleY(rect) + getRectangleHeight(rect)
    );
  };
}

export function makeRectangleUtils(): ShapeUtils<Rectangle> {
  return {
    getCenter: getRectangleCenter,
    contains: isPointInRectangle,
    getDepth: getRectangleDepth,
    extend: extendRectangle,
  };
}
