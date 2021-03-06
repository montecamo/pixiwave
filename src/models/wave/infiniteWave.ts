import type { WavePart, WaveSpeed, WaveDistance } from "./types";

import type { WaveFunction } from "./function";
import { applyWaveFunction, getWaveFunctionFrequency } from "./function";

const WAVE_NEUTRAL = 0;

export type InfiniteWave = {
  func: WaveFunction;
  start: WavePart;
  distance: WaveDistance;
  speed: WaveSpeed;
};

function makeInfiniteWave(
  func: WaveFunction,
  start: WavePart,
  distance: WaveDistance,
  speed: WaveSpeed
): InfiniteWave {
  return { func, distance, speed, start };
}

export function makeBasicInfiniteWave(
  func: WaveFunction,
  speed: WaveSpeed = 1
): InfiniteWave {
  return makeInfiniteWave(func, 0, 0, speed);
}

function getInfiniteWaveStart(wave: InfiniteWave): WavePart {
  return wave.start;
}

function getInfiniteWaveDistance(wave: InfiniteWave): WaveDistance {
  return wave.distance;
}

function getInfiniteWaveSpeed(wave: InfiniteWave): WaveSpeed {
  return wave.speed;
}

function getInfiniteWaveFunction(wave: InfiniteWave): WaveFunction {
  return wave.func;
}

export function updateInfiniteWaveFuncion(
  wave: InfiniteWave,
  func: WaveFunction
): InfiniteWave {
  return makeInfiniteWave(
    func,
    getInfiniteWaveStart(wave),
    getInfiniteWaveDistance(wave),
    getInfiniteWaveSpeed(wave)
  );
}

export function updateInfiniteWaveSpeed(
  wave: InfiniteWave,
  speed: WaveSpeed
): InfiniteWave {
  return makeInfiniteWave(
    getInfiniteWaveFunction(wave),
    getInfiniteWaveStart(wave),
    getInfiniteWaveDistance(wave),
    speed
  );
}

export function increaseInfiniteWave(wave: InfiniteWave): InfiniteWave {
  const func = getInfiniteWaveFunction(wave);
  const frequency = getWaveFunctionFrequency(func);
  const speed = getInfiniteWaveSpeed(wave) / frequency;

  return makeInfiniteWave(
    func,
    getInfiniteWaveStart(wave) + speed,
    getInfiniteWaveDistance(wave) + speed,
    speed
  );
}

export function getInfiniteWavePart(
  wave: InfiniteWave,
  part: number
): WavePart {
  const waveFunction = getInfiniteWaveFunction(wave);

  if (getInfiniteWaveDistance(wave) < part) {
    return WAVE_NEUTRAL;
  }

  return applyWaveFunction(waveFunction, getInfiniteWaveStart(wave) - part);
}
