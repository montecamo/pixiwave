import type {
  AbstractWaveUtils,
  AbstractWaveFunction,
  AbstractWavePart,
} from "./abstract";

export type WaveLength = number;
export type WaveSpeed = number;

const WAVE_SPEED = 1;
const WAVE_NEUTRAL = 0;

export type Wave = {
  start: AbstractWavePart;
  length: WaveLength;
  speed: WaveSpeed;
};

export function makeWave(
  start: AbstractWavePart = 0,
  length: WaveLength = 0,
  speed: WaveSpeed = WAVE_SPEED
): Wave {
  return { length, speed, start };
}

function getWaveStart(wave: Wave): AbstractWavePart {
  return wave.start;
}

function getWaveLength(wave: Wave): WaveLength {
  return wave.length;
}

function getWaveSpeed(wave: Wave): WaveLength {
  return wave.speed;
}

export function increaseWave(wave: Wave): Wave {
  return makeWave(getWaveStart(wave) + WAVE_SPEED, getWaveLength(wave) + 1);
}

export function makeWavePartGetter(
  f: AbstractWaveFunction
): (wave: Wave) => (part: number) => AbstractWavePart {
  return (wave) => (part) => {
    if (getWaveLength(wave) < part) {
      return WAVE_NEUTRAL;
    }

    return f(getWaveStart(wave) - part * getWaveSpeed(wave));
  };
}

export function makeWaveUtils(): AbstractWaveUtils<Wave> {
  return {
    makePartGetter: makeWavePartGetter,
    increase: increaseWave,
    getDistance: () => Infinity,
    make: makeWave,
  };
}
