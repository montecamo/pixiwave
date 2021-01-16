
import { makeStack, pushStack } from './limitedStack';

export const makeSea = (length) => makeStack(length)(0);

export const makeWave = (f) => (progress) => f(progress);

export const shakeSea = (sea) => (wave) => pushStack(sea)(wave);
