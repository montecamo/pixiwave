export type Sinusoid = (x: number) => number;

export function makeSinusoid(frequency: number, amplitude: number): Sinusoid {
  return (x) => Math.sin(x * frequency) * amplitude;
}
