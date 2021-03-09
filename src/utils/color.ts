import chroma from 'chroma-js';

export type Color = string;

export function randomColor(): Color {
  return chroma.random().css();
}
export function mixColors(colors: Array<Color>): Color {
  return chroma.average(colors).css();
}

export function darken(color, amount): Color {
  return chroma(color).darken(amount).css();
}

export function brighten(color, amount): Color {
  return chroma(color).brighten(amount).css();
}
