import type { AbstractWavePart } from "./abstract";

export function interfereWaves(
  parts: Array<AbstractWavePart>
): AbstractWavePart {
  return parts.reduce((a, b) => a + b, 0);
}
