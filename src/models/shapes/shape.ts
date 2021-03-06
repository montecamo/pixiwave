import {
  attachTag,
  getTaggedType,
  getTaggedData,
  getTagsTable,
} from "../../utils";

import type { Point } from "./point";

import { initTagsTable } from "./tagsTable";

import type { ShapeType, ShapeSize, RawShape, Shape } from "./types";

const utilsTable = initTagsTable();

function operate<T>(shape: Shape, util: string, ...args: any[]): T {
  const func = getTagsTable(utilsTable, getTaggedType(shape), util);

  if (!func) {
    throw new Error("Unexpected data type or function type");
  }

  return func(getTaggedData(shape), ...args);
}
function makeShapeSuccessor(shape: Shape, rawShape: RawShape): Shape {
  return attachTag(getTaggedType(shape), rawShape);
}

export function makeBasicShape(
  point: Point,
  type: ShapeType,
  size?: ShapeSize
): Shape {
  const func = getTagsTable(utilsTable, type, "makeBasic");

  if (!func) {
    throw new Error("Unexpected data type or function type");
  }

  return attachTag(type, func(point, size));
}

export function getShapeCenter(shape: Shape): Point {
  return operate<Point>(shape, "getCenter");
}

export function extendShape(shape: Shape): Shape {
  return makeShapeSuccessor(shape, operate<RawShape>(shape, "extend"));
}

export function getShapeCentralShape(shape: Shape): Shape {
  return makeShapeSuccessor(shape, operate<RawShape>(shape, "getCentralShape"));
}

export function isPointInShape(shape: Shape, point: Point): boolean {
  return operate<boolean>(shape, "containsPoint", point);
}

export function getShapePoints(shape: Shape): Array<Point> {
  return operate<Array<Point>>(shape, "getPoints");
}
export function getShapeSize(shape: Shape): number {
  return operate<number>(shape, "getSize");
}
export function getShapeExtremePoints(shape: Shape): Array<Point> {
  return operate<Array<Point>>(shape, "getExtremePoints");
}
export function getShapePointDepth(shape: Shape, point: Point): number {
  return operate<number>(shape, "getPointDepth", point);
}
