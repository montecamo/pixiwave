import type { WavePart, WaveSpeed, WaveDistance, WavePartGetter } from "./wave";
import type { WaveFunction } from "./function";

import { getWaveFunctionFunction } from "./function";

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
  wave: InfiniteWave
): (func: WaveFunction) => InfiniteWave {
  return (func) =>
    makeInfiniteWave(
      func,
      getInfiniteWaveStart(wave),
      getInfiniteWaveDistance(wave),
      getInfiniteWaveSpeed(wave)
    );
}

export function updateInfiniteWaveSpeed(
  wave: InfiniteWave
): (speed: WaveSpeed) => InfiniteWave {
  return (speed) =>
    makeInfiniteWave(
      getInfiniteWaveFunction(wave),
      getInfiniteWaveStart(wave),
      getInfiniteWaveDistance(wave),
      speed
    );
}

export function increaseInfiniteWave(wave: InfiniteWave): InfiniteWave {
  const speed = getInfiniteWaveSpeed(wave);
  return makeInfiniteWave(
    getInfiniteWaveFunction(wave),
    getInfiniteWaveStart(wave) + speed,
    getInfiniteWaveDistance(wave) + speed,
    speed
  );
}

export function getInfiniteWavePart(wave: InfiniteWave): WavePartGetter {
  const waveFunction = getInfiniteWaveFunction(wave);

  return (part) => {
    if (getInfiniteWaveDistance(wave) < part) {
      return WAVE_NEUTRAL;
    }

    return getWaveFunctionFunction(waveFunction)(
      getInfiniteWaveStart(wave) - part
    );
  };
}
