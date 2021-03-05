import { makeCell, getCellCoordinates, CELL_SIZE } from "./cell";

function makeMapElement(): HTMLElement {
  const div = document.createElement("div");

  div.classList.add("map");
  div.id = "map";

  return div;
}

function attachMapClick(
  map: HTMLElement,
  cb: (x: number, y: number) => void
): void {
  map.addEventListener("click", (e) => {
    if (e.target) {
      // @ts-ignore
      const { x, y } = getCellCoordinates(e.target);

      cb(x, y);
    }
  });
}

function makeMap(
  width: number,
  height: number,
  cb: (x: number, y: number) => void
): HTMLElement {
  const map = makeMapElement();

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const cell = makeCell(x, y);

      map.appendChild(cell);
    }
  }

  map.style.width = `${width * CELL_SIZE}px`;
  map.style.height = `${height * CELL_SIZE}px`;

  attachMapClick(map, cb);

  return map;
}

function renderMap(map: HTMLElement): void {
  console.warn("map", map);
  const child = document.getElementById("map");

  if (child) {
    document.removeChild(child);
  }

  document.body.appendChild(map);
}

export function installMap(
  width: number,
  height: number,
  cb: (x: number, y: number) => void
) {
  renderMap(makeMap(width, height, cb));
}
