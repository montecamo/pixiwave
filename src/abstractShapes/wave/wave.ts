export type WaveLength = number;
export type WaveSpeed = number;
export type WavePart = number;

export type WaveFunction = (part: number) => WavePart;

const VERTICAL_SPEED = 0.001;
const WAVE_NEUTRAL = 0;

export type Wave = {
  length: WaveLength;
  verticalSpeed: WaveSpeed;
};

export function makeWave(
  length: WaveLength = 0,
  verticalSpeed: WaveSpeed = VERTICAL_SPEED
): Wave {
  return { length, verticalSpeed };
}

export function getWaveLength(wave: Wave): WaveLength {
  return wave.length;
}

export function getWaveVerticalSpeed(wave: Wave): WaveLength {
  return wave.verticalSpeed;
}

export function increaseWave(wave: Wave): Wave {
  return makeWave(getWaveLength(wave) + 1);
}

export function makeWavePartGetter(
  f: WaveFunction
): (wave: Wave) => (part: number) => WavePart {
  return (wave) => (part) => {
    if (getWaveLength(wave) < part) {
      return WAVE_NEUTRAL;
    }

    return f(getWaveLength(wave) * getWaveVerticalSpeed(wave));
  };
}
