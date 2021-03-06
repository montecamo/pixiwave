import { makeTagsTable, putTagsTable } from "../../utils";
import type { TagsTable } from "../../utils";

import * as circleUtils from "./circle";
import * as rectangleUtils from "./rectangle";

export function initTagsTable(): TagsTable {
  const table = makeTagsTable();

  // CIRCLE
  putTagsTable(table, "circle", "makeBasic", circleUtils.makeBasicCircle);
  putTagsTable(table, "circle", "getCenter", circleUtils.getCircleCenter);
  putTagsTable(
    table,
    "circle",
    "getCentralShape",
    circleUtils.getCircleCentralCircle
  );
  putTagsTable(table, "circle", "extend", circleUtils.extendCircle);
  putTagsTable(
    table,
    "circle",
    "getExtremePoints",
    circleUtils.getCircleExtremePoints
  );
  putTagsTable(table, "circle", "containsPoint", circleUtils.isPointInCircle);
  putTagsTable(table, "circle", "getPoints", circleUtils.getCirclePoints);
  putTagsTable(
    table,
    "circle",
    "getPointDepth",
    circleUtils.getCirclePointDepth
  );
  putTagsTable(table, "circle", "getSize", circleUtils.getCircleSize);

  // RECTANGLE
  putTagsTable(
    table,
    "rectangle",
    "makeBasic",
    rectangleUtils.makeBasicRectangle
  );
  putTagsTable(
    table,
    "rectangle",
    "getCenter",
    rectangleUtils.getRectangleCenter
  );
  putTagsTable(
    table,
    "rectangle",
    "getCentralShape",
    rectangleUtils.getRectangleCentralRectangle
  );
  putTagsTable(table, "rectangle", "extend", rectangleUtils.extendRectangle);
  putTagsTable(
    table,
    "rectangle",
    "getExtremePoints",
    rectangleUtils.getRectangleExtremePoints
  );
  putTagsTable(
    table,
    "rectangle",
    "containsPoint",
    rectangleUtils.isPointInRectangle
  );
  putTagsTable(
    table,
    "rectangle",
    "getPoints",
    rectangleUtils.getRectanglePoints
  );
  putTagsTable(
    table,
    "rectangle",
    "getPointDepth",
    rectangleUtils.getRectanglePointDepth
  );
  putTagsTable(table, "rectangle", "getSize", rectangleUtils.getRectangleSize);

  return table;
}
