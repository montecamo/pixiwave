import {
  attachTag,
  getTaggedType,
  getTaggedData,
  getTagsTable,
} from "../../utils";
import type { TaggedData } from "../../utils";

import type { Point } from "./point";
import type { Rectangle } from "./rectangle";
import type { Circle } from "./circle";

import { initTagsTable } from "./tagsTable";

export type ShapeType = "rectangle" | "circle";
export type ShapeSize = number;
export type RawShape = Rectangle | Circle;
export type Shape = TaggedData<ShapeType, RawShape>;

const utilsTable = initTagsTable();

function operate<T>(shape: Shape, util: string): T {
  const func = getTagsTable(utilsTable, getTaggedType(shape), util);

  if (!func) {
    throw new Error("Unexpected data type or function type");
  }

  return func(getTaggedData(shape));
}
function makeShapeSuccessor(shape: Shape, rawShape: RawShape): Shape {
  return attachTag(getTaggedType(shape), rawShape);
}

export function makeBasicShape(
  point: Point,
  type: ShapeType,
  size: ShapeSize
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
  return operate<(point: Point) => boolean>(shape, "containsPoint")(point);
}

export function getShapePoints(shape: Shape): Array<Point> {
  return operate<Array<Point>>(shape, "getPoints");
}
export function getShapeExtremePoints(shape: Shape): Array<Point> {
  return operate<Array<Point>>(shape, "getExtremePoints");
}
