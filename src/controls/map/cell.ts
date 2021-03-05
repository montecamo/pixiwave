export const CELL_SIZE = 10;

export function makeCell(x: number, y: number): HTMLElement {
  const div = document.createElement("div");

  div.classList.add("map-cell");
  div.dataset.x = String(x);
  div.dataset.y = String(y);
  div.style.width = `${CELL_SIZE}px`;
  div.style.height = `${CELL_SIZE}px`;

  return div;
}

export function getCellCoordinates(
  cell: HTMLElement
): { x: number; y: number } {
  const { x, y } = cell.dataset;

  return { x: Number(x), y: Number(y) };
}
