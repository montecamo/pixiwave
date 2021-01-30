export type Stepper = () => number;

export function makeStepper(step: number): Stepper {
  let start = 0;

  return () => (start += step);
}
