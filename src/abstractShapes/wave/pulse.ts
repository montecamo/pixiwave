import type { WavePart, WaveSpeed, WaveDistance, WavePartGetter } from "./wave";
import type { WaveFunction } from "./function";
import { getWaveFunctionFunction, getWaveFunctionFrequency } from "./function";

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

export function makeBasicPulse(
  func: WaveFunction,
  speed: WaveSpeed = 0.1
): Pulse {
  return makePulse(func, speed, 0);
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

export function updatePulseFuncion(
  pulse: Pulse
): (func: WaveFunction) => Pulse {
  return (func) =>
    makePulse(func, getPulseSpeed(pulse), getPulseDistance(pulse));
}

export function updatePulseSpeed(pulse: Pulse): (speed: WaveSpeed) => Pulse {
  return (speed) =>
    makePulse(getPulseFunction(pulse), speed, getPulseDistance(pulse));
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
