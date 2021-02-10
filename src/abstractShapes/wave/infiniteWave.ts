import type { WavePart, WaveSpeed, WaveDistance, WavePartGetter } from "./wave";
import type { WaveFunction } from "./function";

import { getWaveFunctionFunction } from "./function";

const WAVE_SPEED = 1;
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

export function makeBasicInfiniteWave(func: WaveFunction): InfiniteWave {
  return makeInfiniteWave(func, 0, 0, WAVE_SPEED);
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
  pulse: InfiniteWave
): (func: WaveFunction) => InfiniteWave {
  return (func) =>
    makeInfiniteWave(
      func,
      getInfiniteWaveStart(pulse),
      getInfiniteWaveSpeed(pulse),
      getInfiniteWaveDistance(pulse)
    );
}

export function increaseInfiniteWave(wave: InfiniteWave): InfiniteWave {
  return makeInfiniteWave(
    getInfiniteWaveFunction(wave),
    getInfiniteWaveStart(wave) + WAVE_SPEED,
    getInfiniteWaveDistance(wave) + 1,
    getInfiniteWaveSpeed(wave)
  );
}

export function getInfiniteWavePart(wave: InfiniteWave): WavePartGetter {
  const waveFunction = getInfiniteWaveFunction(wave);

  return (part) => {
    if (getInfiniteWaveDistance(wave) < part) {
      return WAVE_NEUTRAL;
    }

    return getWaveFunctionFunction(waveFunction)(
      getInfiniteWaveStart(wave) - part * getInfiniteWaveSpeed(wave)
    );
  };
}
