import { isEven, isInRange } from './utils.js';
import { getTileX, getTileY } from './tile.js';

export const makeSquare = (size) => {
  if (size === 0) return [];

  return makeSquare(size - 1).concat(size);
}

export const squareSize = (square) => square.length;
export const squareWidth = (square) => Math.sqrt(squareSize(square));
export const squareCenter = (square) => Math.floor(squareWidth(square) / 2);
export const isEvenSquare = (square) => isEven(squareWidth(square));

export const calcTileDepth = (square) => (tile) => {
  const helper = (depth, leftBorder, rightBorder) => {
    const inRange = isInRange(leftBorder, rightBorder);
  
    if (inRange(getTileX(tile)) && inRange(getTileY(tile))) {
      return depth;
    }
  
    return helper(depth - 1, leftBorder - 1, rightBorder + 1);
  }

  const center = squareCenter(square);

  if (isEvenSquare(square)) {
    return helper(center, center - 1, center);
  }

  return helper(center + 1, center, center);
}
