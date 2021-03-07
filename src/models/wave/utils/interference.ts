import type { WavePart } from '../types';

export function interfereWaves(parts: Array<WavePart>): WavePart {
  return parts.reduce((a, b) => a + b, 0);
}
