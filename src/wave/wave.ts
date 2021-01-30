import { makeStack, pushStack, getStackLength } from "./limitedStack";

export type Wave = Array<number>;
export type WaveShaker = (progress: number) => number;

export function makeWave(length: number): Wave {
  return makeStack<number>(length)(0);
}

export const getWaveLength = getStackLength;

export function makeWaveShaker(
  f: (number) => number
): (Wave) => (progress: number) => Wave {
  return (wave) => (progress) => pushStack<number>(wave)(f(progress));
}

export function getWaveHeight(wave): (position: number) => number {
  return (position) => wave[position];
}
