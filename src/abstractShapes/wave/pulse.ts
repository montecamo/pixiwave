import type { WavePart, WaveSpeed, WaveDistance, WavePartGetter } from "./wave";
import type { WaveFunction } from "./function";
import { getWaveFunctionFunction, getWaveFunctionFrequency } from "./function";

const PULSE_SPEED = 1;
const PULSE_NEUTRAL = 0;

export type Pulse = {
  func: WaveFunction;
  distance: WaveDistance;
  speed: WaveSpeed;
};

function makePulse(
  func: WaveFunction,
  speed: WaveSpeed,
  distance: number
): Pulse {
  return { func, speed, distance };
}

export function makeBasicPulse(func: WaveFunction): Pulse {
  return makePulse(func, PULSE_SPEED, 0);
}

export function getPulseDistance(pulse: Pulse): WavePart {
  return pulse.distance;
}

export function getPulseSpeed(pulse: Pulse): WaveSpeed {
  return pulse.speed;
}

export function getPulseFunction(pulse: Pulse): WaveFunction {
  return pulse.func;
}

export function increasePulse(pulse: Pulse): Pulse {
  return makePulse(
    getPulseFunction(pulse),
    getPulseSpeed(pulse),
    getPulseDistance(pulse) + getPulseSpeed(pulse)
  );
}

export function getPulsePart(pulse: Pulse): WavePartGetter {
  const waveFunction = getPulseFunction(pulse);

  return (part) => {
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
