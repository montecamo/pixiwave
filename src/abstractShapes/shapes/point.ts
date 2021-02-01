export type Point = {
  x: number;
  y: number;
  z: number;
};

export const makePoint = (x: number, y: number, z: number = 0) => ({ x, y, z });

export const getPointX = (point: Point) => point.x;
export const getPointY = (point: Point) => point.y;
export const getPointZ = (point: Point) => point.z;
