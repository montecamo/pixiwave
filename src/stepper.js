
export const makeStepper = (step) => {
  let start = 0

  return () => start += step;
}
