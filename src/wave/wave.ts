import { makeStack, pushStack, getStackLength } from "./limitedStack";

export type Wave = Array<number>;
export type WaveShaker = (wave: Wave) => Wave;

export function makeWave(length: number): Wave {
  return makeStack<number>(length)(0);
}

export const getWaveLength = getStackLength;

export function makeWaveShaker(
  f: (number) => number,
  getProgress: () => number
): (Wave) => Wave {
  return (wave) => pushStack<number>(wave)(f(getProgress()));
}

export function getWaveHeight(wave): (position: number) => number {
  return (position) => wave[position];
}
