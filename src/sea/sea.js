import { makeStack, pushStack, getStackLength } from "./limitedStack";

export const makeSea = (length) => makeStack(length)(0);

export const getSeaDepth = getStackLength;

export const makeWave = (f) => (progress) => f(progress);

export const shakeSea = (sea) => (wave) => pushStack(sea)(wave);
