import type { TaggedData } from "../../utils";

import type { Rectangle } from "./rectangle";
import type { Circle } from "./circle";

export type ShapeType = "rectangle" | "circle";
export type ShapeSize = number;
export type RawShape = Rectangle | Circle;
export type Shape = TaggedData<ShapeType, RawShape>;
