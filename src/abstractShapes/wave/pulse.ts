import type {
  AbstractWaveUtils,
  AbstractWaveFunction,
  AbstractWavePart,
} from "./abstract";

export type PulseLength = number;
export type PulseSpeed = number;
export type PulseDistance = number;

const PULSE_SPEED = 1;
const PULSE_NEUTRAL = 0;
const PULSE_LENGTH = Math.PI / 0.1;

export type Pulse = {
  distance: PulseDistance;
  length: PulseLength;
  speed: PulseSpeed;
};

export function makePulse(
  length: PulseLength = PULSE_LENGTH,
  speed: PulseSpeed = PULSE_SPEED,
  distance: number = -PULSE_LENGTH
): Pulse {
  return { length, speed, distance };
}

function getPulseDistance(pulse: Pulse): AbstractWavePart {
  return pulse.distance;
}

function getPulseLength(pulse: Pulse): PulseLength {
  return pulse.length;
}

function getPulseSpeed(pulse: Pulse): PulseLength {
  return pulse.speed;
}

export function increasePulse(pulse: Pulse): Pulse {
  return makePulse(
    getPulseLength(pulse),
    getPulseSpeed(pulse),
    getPulseDistance(pulse) + getPulseSpeed(pulse)
  );
}

export function makePulsePartGetter(
  f: AbstractWaveFunction
): (pulse: Pulse) => (part: number) => AbstractWavePart {
  return (pulse) => (part) => {
    const start = getPulseDistance(pulse);
    const end = getPulseDistance(pulse) + getPulseLength(pulse);

    if (part < start || end < part) {
      return PULSE_NEUTRAL;
    }

    return f(part - start);
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
