export type Point = {
  x: number;
  y: number;
};

export const makePoint = (x: number, y: number) => ({ x, y });

export const getPointX = (point: Point) => point.x;
export const getPointY = (point: Point) => point.y;
