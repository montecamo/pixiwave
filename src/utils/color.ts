import chroma from "chroma-js";
import { makeHashTable } from "./hashtable";

export type Color = string;

const hashTable = makeHashTable((colors) => colors.join(""));

export function randomColor(): Color {
  return chroma.random().css();
}
export function mixColors(colors: Array<Color>): Color {
  const cached = hashTable.get(colors);

  if (cached) {
    return cached;
  }

  const result = chroma.average(colors).css();

  hashTable.set(colors, result);

  return result;
}

export function darken(color, amount): Color {
  return chroma(color).darken(amount).css();
}
