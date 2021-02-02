import type { Wave } from "./wave";
import { makeWaveUtils } from "./wave";

import type { Pulse } from "./pulse";
import { makePulseUtils } from "./pulse";

export type AbstractWaveType = "wave" | "pulse";
export type AbstractWaveWave = Wave | Pulse;

export type AbstractWave<T = AbstractWaveWave, U = AbstractWaveType> = {
  wave: T;
  type: U;
};

export type AbstractWaveFunction = {
  f: (part: number) => number;
  frequency: number;
  amplitude: number;
};

export type AbstractWavePart = number;
export type AbstractWavePartGetter = (
  wave: AbstractWave
) => (part: number) => AbstractWavePart;
export type AbstractWaveDistance = number;

export type AbstractWaveUtils<T = AbstractWaveWave> = {
  increase: (wave: T) => T;
  makePartGetter: (
    f: AbstractWaveFunction
  ) => (wave: T) => (part: number) => AbstractWavePart;
  getDistance: (wave: T) => AbstractWaveDistance;
  make: () => T;
};

export function makeAbstractWave<
  T extends AbstractWaveWave,
  U extends AbstractWaveType
>(wave: T, type: U): AbstractWave<T, U> {
  return { wave, type };
}

export function getAbstractWaveWave(
  abstractWave: AbstractWave
): AbstractWaveWave {
  return abstractWave.wave;
}
export function getAbstractWaveType(
  abstractWave: AbstractWave
): AbstractWaveType {
  return abstractWave.type;
}

export function makeAbstractWaveUtilsByType(
  type: AbstractWaveType
): AbstractWaveUtils {
  if (type === "wave") {
    // @ts-ignore
    return makeWaveUtils();
  } else if (type === "pulse") {
    // @ts-ignore
    return makePulseUtils();
  }
}

export function increaseAbstractWave(abstractWave: AbstractWave): AbstractWave {
  const type = getAbstractWaveType(abstractWave);
  const utils = makeAbstractWaveUtilsByType(type);

  const wave = getAbstractWaveWave(abstractWave);

  return makeAbstractWave(utils.increase(wave), type);
}

export function makeAbstractWavePartGetter(
  f: AbstractWaveFunction
): AbstractWavePartGetter {
  return (abstractWave) => {
    const type = getAbstractWaveType(abstractWave);
    const utils = makeAbstractWaveUtilsByType(type);

    const wave = getAbstractWaveWave(abstractWave);

    return utils.makePartGetter(f)(wave);
  };
}

export function getAbstractWaveDistance(
  abstractWave: AbstractWave
): AbstractWaveDistance {
  const type = getAbstractWaveType(abstractWave);
  const utils = makeAbstractWaveUtilsByType(type);

  const wave = getAbstractWaveWave(abstractWave);

  return utils.getDistance(wave);
}

export function makeAbstractWaveOfType(type: AbstractWaveType): AbstractWave {
  const utils = makeAbstractWaveUtilsByType(type);

  return makeAbstractWave(utils.make(), type);
}
