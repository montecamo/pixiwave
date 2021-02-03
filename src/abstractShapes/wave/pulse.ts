import type {
  AbstractWaveUtils,
  AbstractWaveFunction,
  AbstractWavePart,
} from "./abstract";
import { getWaveFunctionFunction, getWaveFunctionFrequency } from "./function";

export type PulseSpeed = number;
export type PulseDistance = number;

const PULSE_SPEED = 1;
const PULSE_NEUTRAL = 0;

export type Pulse = {
  distance: PulseDistance;
  speed: PulseSpeed;
};

export function makePulse(
  speed: PulseSpeed = PULSE_SPEED,
  distance: number = 0
): Pulse {
  return { speed, distance };
}

function getPulseDistance(pulse: Pulse): AbstractWavePart {
  return pulse.distance;
}

function getPulseSpeed(pulse: Pulse): PulseSpeed {
  return pulse.speed;
}

export function increasePulse(pulse: Pulse): Pulse {
  return makePulse(
    getPulseSpeed(pulse),
    getPulseDistance(pulse) + getPulseSpeed(pulse)
  );
}

export function makePulsePartGetter(
  waveFunction: AbstractWaveFunction
): (pulse: Pulse) => (part: number) => AbstractWavePart {
  return (pulse) => (part) => {
    const start =
      getPulseDistance(pulse) -
      Math.PI / getWaveFunctionFrequency(waveFunction);
    const end = getPulseDistance(pulse);

    if (part < start || end < part) {
      return PULSE_NEUTRAL;
    }

    return getWaveFunctionFunction(waveFunction)(part - start);
  };
}

export function makePulseUtils(): AbstractWaveUtils<Pulse> {
  return {
    makePartGetter: makePulsePartGetter,
    increase: increasePulse,
    getDistance: () => Infinity,
    make: makePulse,
  };
}
