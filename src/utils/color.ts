import chroma from "chroma-js";

export type Color = string;

export function randomColor(): Color {
  return chroma.random().css();
}
export function mixColors(colors: Array<Color>): Color {
  return chroma.average(colors).css();
}
