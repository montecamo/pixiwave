export type WaveLength = number;
export type WaveSpeed = number;
export type WavePart = number;

export type WaveFunction = (part: number) => WavePart;

const VERTICAL_SPEED = 0.01;
const WAVE_NEUTRAL = 0;

export type Wave = {
  start: WavePart;
  length: WaveLength;
  verticalSpeed: WaveSpeed;
};

export function makeWave(
  start: WavePart = 0,
  length: WaveLength = 0,
  verticalSpeed: WaveSpeed = VERTICAL_SPEED
): Wave {
  return { length, verticalSpeed, start };
}

export function getWaveStart(wave: Wave): WavePart {
  return wave.start;
}

export function getWaveLength(wave: Wave): WaveLength {
  return wave.length;
}

export function getWaveVerticalSpeed(wave: Wave): WaveLength {
  return wave.verticalSpeed;
}

export function increaseWave(wave: Wave): Wave {
  return makeWave(getWaveStart(wave) + VERTICAL_SPEED, getWaveLength(wave) + 1);
}

export function makeWavePartGetter(
  f: WaveFunction
): (wave: Wave) => (part: number) => WavePart {
  return (wave) => (part) => {
    if (getWaveLength(wave) < part) {
      return WAVE_NEUTRAL;
    }

    const res = f(getWaveStart(wave) - part * getWaveVerticalSpeed(wave));

    return res;
  };
}
