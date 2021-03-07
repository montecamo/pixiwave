import { fromEvent, race } from 'rxjs';

import { filter, switchMap, mapTo, scan } from 'rxjs/operators';

const MIN_MOVE_DELTA = 3;

const mousedown$ = fromEvent(window, 'pointerdown', { capture: true }).pipe(
  mapTo('down')
);
const mousemove$ = fromEvent<MouseEvent>(window, 'pointermove', {
  capture: true,
}).pipe(
  scan(
    ([prevX, prevY], { movementX, movementY }) => [
      prevX + Math.abs(movementX),
      prevY + Math.abs(movementY),
    ],
    [0, 0]
  ),
  filter(
    ([deltaX, deltaY]) => deltaX > MIN_MOVE_DELTA || deltaY > MIN_MOVE_DELTA
  ),
  mapTo('move')
);
const mouseup$ = fromEvent(window, 'pointerup', { capture: true }).pipe(
  mapTo('up')
);

export function onSingleClick(cb: () => void) {
  return mousedown$
    .pipe(
      switchMap(() => race(mousemove$, mouseup$)),
      filter((key) => key !== 'move')
    )
    .subscribe(() => cb());
}
