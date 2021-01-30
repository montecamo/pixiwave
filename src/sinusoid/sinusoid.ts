export function makeSinusoid(
  frequency: number,
  amplitude: number
): (x: number) => number {
  return (x) => Math.sin(x * frequency) * amplitude;
}
