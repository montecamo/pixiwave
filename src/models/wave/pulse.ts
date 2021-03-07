import type { WavePart, WaveSpeed, WaveDistance } from './types';

import type { WaveFunction } from './function';
import { applyWaveFunction, getWaveFunctionFrequency } from './function';

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
  speed: WaveSpeed = 1
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

export function updatePulseFuncion(pulse: Pulse, func: WaveFunction): Pulse {
  return makePulse(func, getPulseSpeed(pulse), getPulseDistance(pulse));
}

export function updatePulseSpeed(pulse: Pulse, speed: WaveSpeed): Pulse {
  return makePulse(getPulseFunction(pulse), speed, getPulseDistance(pulse));
}

export function increasePulse(pulse: Pulse): Pulse {
  const func = getPulseFunction(pulse);
  const frequency = getWaveFunctionFrequency(func);
  const speed = getPulseSpeed(pulse);

  return makePulse(func, speed, getPulseDistance(pulse) + speed / frequency);
}

export function getPulsePart(pulse: Pulse, part: number): WavePart {
  const waveFunction = getPulseFunction(pulse);

  const start =
    getPulseDistance(pulse) - Math.PI / getWaveFunctionFrequency(waveFunction);
  const end = getPulseDistance(pulse);

  if (part < start || end < part) {
    return PULSE_NEUTRAL;
  }

  return applyWaveFunction(waveFunction, part - start);
}
