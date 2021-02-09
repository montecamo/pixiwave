import type { WavePart } from "./wave";

export function interfereWaves(parts: Array<WavePart>): WavePart {
  return parts.reduce((a, b) => a + b, 0);
}
