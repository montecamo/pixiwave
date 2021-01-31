import type { Shape, AbstractShape, Rectangle } from "../shapes";
import {
  makeShapeUtils,
  getShape,
  makeShape,
  makeBasicRectangle,
  makeRectangle,
} from "../shapes";

import { getMaxWaveLength } from "./waveDepth";

export function shapeToRectangle<T extends Shape>(
  shape: AbstractShape<T>
): AbstractShape<Rectangle> {
  const shapeUtils = makeShapeUtils(shape);
  const shapeCenter = shapeUtils.getCenter(getShape(shape));

  const halfWidth = getMaxWaveLength(
    shape,
    makeShape(makeBasicRectangle(shapeCenter), "rectangle")
  );

  return makeShape(
    makeRectangle(shapeCenter, halfWidth * 2, halfWidth * 2),
    "rectangle"
  );
}
