export type Sinusoid = {
  f: (x: number) => number;
  frequency: number;
  amplitude: number;
};

export function makeSinusoid(frequency: number, amplitude: number): Sinusoid {
  function sinusoid(x) {
    return Math.sin(x * frequency) * amplitude;
  }

  return {
    f: sinusoid,
    frequency,
    amplitude,
  };
}
