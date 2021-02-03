export type WaveFunctionFrequency = number;
export type WaveFunctionAmplitude = number;
export type WaveFunctionFunction = (x: number) => number;
export type WaveFunction = {
  function: WaveFunctionFunction;
  frequency: WaveFunctionFrequency;
  amplitude: WaveFunctionAmplitude;
};

export function makeWaveFunction(
  frequency: WaveFunctionFrequency,
  amplitude: WaveFunctionAmplitude
): WaveFunction {
  function waveFunction(x: number): number {
    return Math.sin(x * frequency) * amplitude;
  }

  return {
    function: waveFunction,
    frequency,
    amplitude,
  };
}

export function getWaveFunctionFunction(
  waveFunction: WaveFunction
): WaveFunctionFunction {
  return waveFunction.function;
}
export function getWaveFunctionFrequency(
  waveFunction: WaveFunction
): WaveFunctionFrequency {
  return waveFunction.frequency;
}
export function getWaveFunctionAmplitude(
  waveFunction: WaveFunction
): WaveFunctionAmplitude {
  return waveFunction.amplitude;
}
