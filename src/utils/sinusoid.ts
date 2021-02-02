export type Sinusoid = (x: number) => number;

export function makeSinusoid(frequency: number, amplitude: number): Sinusoid {
  function sinusoid(x) {
    return Math.sin(x * frequency) * amplitude;
  }

  sinusoid.frequency = frequency;
  sinusoid.amplitude = amplitude;

  return sinusoid;
}
